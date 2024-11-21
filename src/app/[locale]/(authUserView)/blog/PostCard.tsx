import { FC } from "react";
import Link from "next/link";
import "./PostCard.css";
 
interface PostCardProps {
  post: {
    id: number;
    title_en: string;
    title_ka: string;
    body_en: string;
    body_ka: string;
    tags: string[];
  };
  locale: string;
}
 
export const PostCard: FC<PostCardProps> = ({ post, locale }) => {
  const title = locale === "ka" ? post.title_ka : post.title_en;
  const body = locale === "ka" ? post.body_ka : post.body_en;
 
  return (
    <div key={post.id} className="postItem">
      <h3>{title}</h3>
      <div>
        <Link href={`/${locale}/blog/${post.id}`}>read more</Link>
      </div>
    </div>
  );
};