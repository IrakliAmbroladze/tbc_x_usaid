"use client"
import { useEffect, useState } from "react"
import { PostList } from "./PostList";

const postsURL = 'https://dummyjson.com/posts';

export default function Blog() {
   const [postList, setPostList] = useState([]);

   useEffect(()=>{
     async function fetchPosts() {
       try {
         const response = await fetch(postsURL);
         const data = await response.json();
         setPostList(data.posts);
         console.log(data.posts);
        } catch (error) {
          setPostList([]);
        }
      }
      fetchPosts();
  },[]);

  return <PostList postList={postList} />
}
