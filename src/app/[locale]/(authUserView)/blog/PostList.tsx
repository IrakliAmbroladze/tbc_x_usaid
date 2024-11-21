import { FC } from "react";
import { PostCard } from "./PostCard";
import "./PostCard.css";
 
interface PostListProps {
  postList: Array<{
    id: number;
    title_en: string;
    title_ka: string;
    body_en: string;
    body_ka: string;
    tags: string[];
  }>;
  locale: string;
}
 
export const PostList: FC<PostListProps> = ({ postList, locale }) => {
  return (
    <div className="container margin-top-20px margin-bottom-20px">
      <h2 style={{ textAlign: "center" }}>B L O G</h2>
      <div className="postItems margin-top-20px">
        {postList.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  );
};