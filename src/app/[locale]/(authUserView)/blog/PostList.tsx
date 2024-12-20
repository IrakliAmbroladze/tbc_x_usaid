import { Post } from "./fetchPosts";
import { FC } from "react";
import { PostCard } from "./PostCard";

interface PostListProps {
  postList: Post[];
  locale: string;
}

export const PostList: FC<PostListProps> = ({ postList, locale }) => {
  const blogTitle = locale === "ka" ? "ბ ლ ო გ ი" : "B L O G";

  return (
    <div className="container mx-auto mt-8 mb-8 px-4">
      <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
        {blogTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {postList.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  );
};
