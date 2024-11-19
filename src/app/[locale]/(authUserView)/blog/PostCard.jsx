import "./PostCard.css";
import Link from "next/link";

export const PostCard = (props) => {
  return (
    <div key={props.post.id} className="postItem">
      <h3>{props.post.title}</h3>
      <div>
        <Link href={`/${props.locale}/blog/${props.post.id}`}>read more</Link>
      </div>
    </div>
  );
};
