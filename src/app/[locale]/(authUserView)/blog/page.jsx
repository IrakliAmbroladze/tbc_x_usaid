'use client'

import { useState, useEffect } from "react";
import { PostList } from "./PostList";
import { fetchPosts } from "./fetchPosts";

export default function Blog() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await fetchPosts();
      setPostList(posts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <PostList postList={postList} />;
}
