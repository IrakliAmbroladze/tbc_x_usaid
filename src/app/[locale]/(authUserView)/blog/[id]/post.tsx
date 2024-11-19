interface PostProps {
  post: {
    id: string | number;
    title: string;
    body: string;
    tags: string[];
  };
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <div key={post.id} className="container margin-top-20px margin-bottom-20px">
      <h1>{post.title}</h1>
      <div className="margin-top-20px"></div>
      <p>{post.body}</p>
      <div className="margin-top-20px"></div>
      <p>
        {post.tags.map((tag, index) => (
          <i key={index}> | {`${tag} `} </i>
        ))}
      </p>
    </div>
  );
}
