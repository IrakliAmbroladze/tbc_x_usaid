export default function Post(props) {
  console.log(props);
  return (
    <div key={props.post.id} className="container margin-top-20px margin-bottom-20px">
      <h1>{props.post.title}</h1>
      <p>{props.post.body}</p>
      <p>{props.post.tags.map((tag) => (
          <i>{`${tag} `}</i>
          ))}</p>
    </div>
  )
}