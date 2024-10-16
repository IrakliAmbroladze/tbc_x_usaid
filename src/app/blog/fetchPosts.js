export async function fetchPosts() {
  const productsURL = 'https://dummyjson.com/posts';
  try {
    const response = await fetch(productsURL);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    return "";
  }
}