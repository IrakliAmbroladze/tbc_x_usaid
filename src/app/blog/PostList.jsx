import { PostCard } from "./PostCard"
import "./PostCard.css"

export const PostList = (props)=> {
  return (
    <div className="container margin-top-20px margin-bottom-20px">
      <h2 style={{textAlign: "center"}}>B L O G</h2>
      <div className="postItems margin-top-20px">
        {props.postList.map((post)=>(
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

