"use client";

import { useEffect, useState } from "react";
import PostList from "./PostList";

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
): Promise<{ posts: Post[]; total: number } | string> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}&limit=${limit}`,
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return "";
  }
};

const PaginatedBlog = ({ locale }: { locale: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts(currentPage, postsPerPage);
      if (typeof data !== "string") {
        setPosts(data.posts);
        setTotalPosts(data.total);
      }
    };

    fetchData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

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
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black"
        >
          {locale == "ka" ? "შემდეგი" : "Next"}
        </button>
      </div>
      <PostList postList={posts} locale={locale} />
    </div>
  );
};

export default PaginatedBlog;
