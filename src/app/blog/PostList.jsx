import { PostCard } from "./PostCard"
import "./PostCard.css"

export const PostList = (props)=> {
  return (
    <div className="container margin-top-20px margin-bottom-20px">
      <h2 style={{textAlign: "center"}}>B L O G</h2>
      <div className="items margin-top-20px">
        {props.postList.map((post)=>(
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
// import { blogs } from './Blog_data'
// import BlogCart from './BlogCart'

// export function BlogList() {

//   return (
//     <div className="container margin-top-20px">

//     <div className='item_grid'>
//       {blogs.map((product, key) =>
//         <BlogCart key={key} data={product}/>
        
//       )}
//     </div>
//       </div>
//   )
// }


