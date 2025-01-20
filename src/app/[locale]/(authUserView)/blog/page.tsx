import { FC } from "react";
import { Link } from "i18n/routing";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

type Post = {
  id: number;
  title_en: string;
  title_ka: string;
  body_en: string;
  body_ka: string;
  tags: string[];
  body: string;
  title: string;
  views: string;
  tag_001_en: string | null;
  tag_002_en: string | null;
  tag_003_en: string | null;
};
const fetchPosts = async (): Promise<Post[] | string> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return "";
  }
};

interface PostListProps {
  postList: Post[];
}
interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps): JSX.Element => {
  const langCookie = cookies().get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("Add");
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b-2 border-black">
        {langCookie == "ka" ? post.title_ka : post.title_en}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
        {langCookie == "ka" ? post.body_ka : post.body_en}
      </p>
      <div className="mt-auto flex justify-between">
        <div className="flex justify-center text-black pt-2 font-medium text-sm ">
          {t("views")}: {post.views}
        </div>
        <Link
          href={`/blog/${post.id}`}
          className="bg-black text-white py-2 px-4 font-medium text-sm rounded-md hover:bg-gray-500  ease-in-out"
        >
          {t("Read more")}
        </Link>
      </div>
    </div>
  );
};

const PostList: FC<PostListProps> = ({ postList }) => {
  const langCookie = cookies().get("NEXT_LOCALE")?.value || "en";

  return (
    <div className="container mx-auto mt-8 mb-8 px-4">
      <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
        {langCookie == "ka" ? "ბ ლ ო გ ი" : "B L O G"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {postList.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const Blog = async (): Promise<JSX.Element> => {
  const postList = await fetchPosts();

  if (typeof postList === "string") {
    console.error("Error fetching posts:", postList);
    return <div>Error loading posts</div>;
  }

  return <PostList postList={postList} />;
};

export default Blog;
