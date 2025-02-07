import { Post } from "@/types/post";

export const fetchPostById = async (id: string): Promise<Post | null> => {
  const appUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${appUrl}/api/posts/${id}`, {
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const post: Post = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};
