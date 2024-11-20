export async function fetchPost(id: string): Promise<any> {
  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return {};
  }
}
