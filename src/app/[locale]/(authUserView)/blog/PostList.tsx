import { PostCard } from "./PostCard";
import "./PostCard.css";

interface PostListProps {
  postList: Array<{ id: string | number; title: string; body: string; tags: string[] }>;
  locale: string;
}

export const PostList = ({ postList, locale }: PostListProps): JSX.Element => {
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
