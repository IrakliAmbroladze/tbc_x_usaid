import Link from "next/link";
import { Post } from "./fetchPosts";

interface PostCardProps {
  post: Post;
  locale: string;
}

export const PostCard = ({ post, locale }: PostCardProps): JSX.Element => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b-2 border-black">
        {post.title_ka}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{post.body_ka}</p>
      <div className="mt-auto flex justify-between">
        <div className="flex justify-center text-black pt-2 font-medium text-sm ">
          views: {post.views}
        </div>
        <Link
          href={`/${locale}/blog/${post.id}`}
          className="bg-black text-white py-2 px-4 font-medium text-sm rounded-md hover:bg-gray-500  ease-in-out"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};
