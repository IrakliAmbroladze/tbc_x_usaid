import { PostList } from "./PostList";
import { fetchPosts } from "./fetchPosts";

export default async function Blog({ params }) {
  const postList = await fetchPosts();
  const locale = params?.locale || "en";

  return <PostList postList={postList} locale={locale} />;
}
