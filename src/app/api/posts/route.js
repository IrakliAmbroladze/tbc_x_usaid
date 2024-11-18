import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://cbhoxdzzhvcuajscuqes.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const GET = async (req, res) => {
  let { data: posts, error } = await supabase
  .from('posts')
  .select('*')
  return Response.json(posts)
}

  // const postsURL = Response.json(posts)

  // try {
  //   const response = await fetch(postsURL);
  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch data: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   res.status(200).json({ posts: data.posts });
  // } catch (error) {
  //   console.error('Error fetching posts:', error);
  //   res.status(500).json({ error: 'Failed to fetch posts' });
  // }