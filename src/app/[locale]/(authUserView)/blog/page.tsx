import { PostList } from "./PostList";
import { fetchPosts } from "./fetchPosts";
 
export default async function Blog({ params }: { params: { locale?: string } }): Promise<JSX.Element> {
  const postList = await fetchPosts();
  const locale = params?.locale || "en";
 
  if (typeof postList === "string") {
    console.error("Error fetching posts:", postList);
    return <div>Error loading posts</div>;
  }
 
  return <PostList postList={postList} locale={locale} />;
}