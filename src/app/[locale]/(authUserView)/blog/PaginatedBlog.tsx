"use client";

import { useEffect, useState } from "react";
import PostList from "./PostList";
import { createClient } from "@/lib/supabase/client";

type Post = {
  id: number;
  title_en: string;
  title_ka: string;
  body_en: string;
  body_ka: string;
  tags: string[];
  body: string;
  title: string;
  views: string;
  tag_001_en: string | null;
  tag_002_en: string | null;
  tag_003_en: string | null;
};

const fetchPosts = async (
  page: number = 1,
  limit: number = 5,
  query: string,
): Promise<{ posts: Post[]; total: number } | string> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}&limit=${limit}&query=${query}`,
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return "";
  }
};

export interface BogListProps {
  locale: string;
  query?: string;
}

const PaginatedBlog = ({ locale, query = "" }: BogListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts(currentPage, postsPerPage, query);
      if (typeof data !== "string") {
        setPosts(data.posts);
        setTotalPosts(data.total);
      }
    };

    fetchData();
  }, [currentPage, query]);
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  const handleDelete = async (id: number | string) => {
    try {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch("/api/delete-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${await response.text()}`);
      }

      setPosts((prevList) => prevList.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="w-full max-w-[1110px] mx-auto mb-8 px-4">
      <div className="flex justify-end items-center gap-2 ">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="text-black px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          {locale == "ka" ? "წინა" : "Prev"}
        </button>
        <span className="font-medium text-black dark:text-white">
          {locale == "ka" ? "გვერდი" : "Page"} {currentPage} ({totalPages})
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black"
        >
          {locale == "ka" ? "შემდეგი" : "Next"}
        </button>
      </div>
      <PostList postList={posts} locale={locale} onDelete={handleDelete} />
    </div>
  );
};

export default PaginatedBlog;
