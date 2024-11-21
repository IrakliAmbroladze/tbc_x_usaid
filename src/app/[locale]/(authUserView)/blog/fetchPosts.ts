type Post = {
  id: number;
  title: string;
  body: string;
  [key: string]: any;
};

export async function fetchPosts(): Promise<Post[] | string> {
  const apiURL = 'http://localhost:3000/api/posts';
  try {
    const response = await fetch(apiURL);
    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return "";
  }
}
