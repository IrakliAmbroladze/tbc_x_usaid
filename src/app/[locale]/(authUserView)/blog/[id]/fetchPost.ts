export interface singlePost {
  id: string | number;
  title_ka: string;
  title_en: string;
  body_ka: string;
  body_en: string;
  tags: string[];
  likes: string;
  dislikes: string;
  views: string;
  tag_001_en: string | null;
  tag_002_en: string | null;
  tag_003_en: string | null;
}

export async function fetchPost(id: string): Promise<singlePost | null> {
  const apiURL = "http://localhost:3000";
  try {
    const response = await fetch(`${apiURL}/api/posts/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
