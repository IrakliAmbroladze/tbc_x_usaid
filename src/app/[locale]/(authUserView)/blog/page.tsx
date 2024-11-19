import { PostList } from "./PostList";
import { fetchPosts } from "./fetchPosts";

export default async function Blog({ params }: { params: { locale?: string } }): Promise<JSX.Element> {
  const postList = await fetchPosts();
  const locale = params?.locale || "en";

  return <PostList postList={postList} locale={locale} />;
}
