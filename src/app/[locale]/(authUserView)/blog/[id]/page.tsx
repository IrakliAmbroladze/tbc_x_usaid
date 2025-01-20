import { cookies } from "next/headers";

interface Post {
  id: string | number;
  title_ka: string;
  title_en: string;
  body_ka: string;
  body_en: string;
  tags: string[];
  likes: string;
  dislikes: string;
  views: string;
  tag_001_en: string | null;
  tag_002_en: string | null;
  tag_003_en: string | null;
}

const fetchPost = async (id: string): Promise<Post | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

interface PostProps {
  post: Post;
}

const Post = ({ post }: PostProps): JSX.Element => {
  const langCookie = cookies().get("NEXT_LOCALE")?.value || "en";
  const tags = [post.tag_001_en, post.tag_002_en, post.tag_003_en].filter(
    Boolean,
  );

  return (
    <div
      key={post.id}
      className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-6 border border-gray-200 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-black">
        {langCookie == "ka" ? post.title_ka : post.title_en}
      </h1>

      <div className="mb-4">
        <p className="text-lg text-gray-700">
          {langCookie == "ka" ? post.body_ka : post.body_en}
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <p className="text-sm text-gray-600">
          {tags.map((tag, index) => (
            <span key={index} className="inline-block mr-2 text-blue-500">
              #{tag}
            </span>
          ))}
        </p>
        <div className="flex text-black gap-6">
          <p className="text-2xl">
            👍: <span className="text-xl">{post.likes}</span>
          </p>
          <p className="text-2xl">
            👎: <span className="text-xl">{post.dislikes}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

interface postPageProps {
  params: { id: string };
}

export default async function PostPage({
  params,
}: postPageProps): Promise<JSX.Element> {
  const { id } = params;
  const post = await fetchPost(id);
  if (!post) {
    return <p>post does not exist</p>;
  }
  return <Post key={id} post={post} />;
}
