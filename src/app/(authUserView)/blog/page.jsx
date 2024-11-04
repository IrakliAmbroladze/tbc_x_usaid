import { PostList } from "./PostList";
import {fetchPosts} from "./fetchPosts";

export default async function Blog() {
  const postList = await fetchPosts();
  return <PostList postList={postList} />
}