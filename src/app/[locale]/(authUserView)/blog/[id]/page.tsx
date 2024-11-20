import { fetchPost } from "./fetchPost";
import Post from "./post";

export default async function PostPage({ params }: { params: { id: string } }): Promise<JSX.Element> {
  const { id } = params;
  const post = await fetchPost(id);

  return <Post key={post.id} post={post} />;
}
