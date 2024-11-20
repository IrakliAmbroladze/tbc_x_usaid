export async function fetchPosts() {
  const apiURL = 'http://localhost:3000/api/posts'; 
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return "";
  }
}