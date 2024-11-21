interface PostProps {
  post: {
    id: string | number;
    title_ka: string;
    title_en: String;
    body: string;
    tags: string[];
  };
  locale?: string;
}

export default function Post({
   post, locale 
  }: PostProps): JSX.Element {
  const title = locale === "ka" ? post.title_ka : post.title_en;
  return (
    <div key={post.id} className="container margin-top-20px margin-bottom-20px">
      <h1>{title}</h1>
      <div className="margin-top-20px"></div>
      <p>{post.body}</p>
      <div className="margin-top-20px"></div>
    </div>
  );
}
