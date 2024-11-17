export async function fetchPosts() {
  const apiURL = '/api/posts'; // Internal API endpoint
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return "";
  }
}