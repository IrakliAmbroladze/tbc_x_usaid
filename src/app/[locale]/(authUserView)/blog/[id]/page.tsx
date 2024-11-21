import { fetchPost } from "./fetchPost";
import Post from "./post";

interface postPageProps {
  params: { id: string; locale?: string };
}

export default async function PostPage({ params }: postPageProps): Promise<JSX.Element> {
  const { id, locale } = params;
  const post = await fetchPost(id);

  return <Post key={post.id} post={post} locale={locale} />;
}
