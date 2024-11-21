import { singlePost } from "./fetchPost";

interface PostProps {
  post: singlePost;
  locale?: string;
}

export default function Post({ post, locale }: PostProps): JSX.Element {
  const title = locale === "ka" ? post.title_ka : post.title_en;
  const body = locale === "ka" ? post.body_ka : post.body_en;

  const tags = [post.tag_001_en, post.tag_002_en, post.tag_003_en].filter(
    Boolean
  );

  return (
    <div
      key={post.id}
      className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-6 border border-gray-200 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-black">
        {title}
      </h1>

      <div className="mb-4">
        <p className="text-lg text-gray-700">{body}</p>
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
}
