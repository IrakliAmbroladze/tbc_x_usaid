import "./PostCard.css"
import Link from "next/link"


export const PostCard = (props) => {
  console.log(props);
  return (
    <div className="item">
          <h3 >{props.post.title}</h3>
        <div>
        {/* <img 
          src={props.product.images[0]} 
          alt={props.product.title}
          className="item-img"
          style={{
            height: '100%',
            width: '100%',
            }}
            /> */}
          {/* {props.post.body} */}
          {/* {getTruncatedContent(props.post.body, wordNumText)} */}


        </div>
        {/* <div>{props.product.price}</div> */}
        {/* <p className="item-desc">{props.post.description}</p> */}
        <div>
          {/* <button className="button">Add to Cart</button> */}
          <Link href={`/blog/${props.post.id}`}>read more</Link>
        </div>
    </div>
  )
}

// const getTruncatedContent = (content, wordLimit) => {
//   const words = content.split(' ');
//   return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
// };

// show how many words of the blog body to be shown in blog list content
// const wordNumText = 20;