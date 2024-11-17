import fetch from 'node-fetch';

export default async function handler(req, res) {
  const productsURL = 'https://dummyjson.com/posts';
  try {
    const response = await fetch(productsURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json({ posts: data.posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}