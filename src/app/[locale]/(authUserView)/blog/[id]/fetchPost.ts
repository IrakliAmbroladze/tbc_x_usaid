export async function fetchPost(id: string): Promise<any> {
  const appUrl = process.env.AUTH0_BASE_URL;
  try {
    const response = await fetch(`${appUrl}/api/posts/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return {};
  }
}
