import "./PostCard.css"
import Link from "next/link"


export const PostCard = (props) => {
  console.log(props);
  return (
    <div className="postItem">
          <h3 >{props.post.title}</h3>
        <div>
          <Link href={`/blog/${props.post.id}`}>read more</Link>
        </div>
    </div>
  )
}