export default function Post(props) {
  return (
    <div key={props.post.id} className="container margin-top-20px margin-bottom-20px">
      <h1>{props.post.title}</h1>
      <div className="margin-top-20px"></div>
      <p>{props.post.body}</p>
      <div className="margin-top-20px"></div>
      <p>{props.post.tags.map((tag) => (
          <i> | {`${tag} `} </i>
          ))}</p>
    </div>
  )
}