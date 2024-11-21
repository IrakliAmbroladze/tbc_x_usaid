export type Post = {
  views: string;
  id: number;
  title_en: string;
  title_ka: string;
  body_en: string;
  body_ka: string;
  tags: string[];
};

export async function fetchPosts(): Promise<Post[] | string> {
  const apiURL = 'http://localhost:3000/api/posts';
  try {
    const response = await fetch(apiURL);
    const posts: Post[] = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return "";
  }
}