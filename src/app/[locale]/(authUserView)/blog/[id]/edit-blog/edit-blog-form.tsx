"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import { createClient } from "@/lib/supabase/client";
import { fetchPostById } from "@/utils/fetch-post-by-id";

const EditPostForm = ({ id }: { id: string }): JSX.Element => {
  const [formData, setFormData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchPostById(id);
      if (post != null) {
        setFormData(post);
      }
    };
    fetchPost();
  }, [id]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (prevData === null) return prevData;
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("User is not authenticated");
      }
      const response = await fetch("/api/edit-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Post updated successfully!");
      } else {
        setError(data.error || "An unexpected error occurred.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!formData ? (
        <p>loading ...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="title_ka"
                className="block text-gray-700 dark:text-white"
              >
                სათაური
              </label>
              <input
                type="text"
                id="title_ka"
                name="title_ka"
                value={formData.title_ka}
                onChange={handleChange}
                required
                className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="title_en"
                className="block text-gray-700 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title_en"
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                required
                className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="body_ka"
                className="block text-gray-700 dark:text-white"
              >
                აღწერა
              </label>
              <textarea
                id="body_ka"
                name="body_ka"
                value={formData.body_ka}
                onChange={handleChange}
                required
                className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="body_en"
                className="block text-gray-700 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="body_en"
                name="body_en"
                value={formData.body_en}
                onChange={handleChange}
                required
                className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              data-cy="update"
              disabled={loading}
              className={`px-6 py-3 mt-4 text-white rounded-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Submitting..." : "Update Post"}
            </button>
          </div>
        </form>
      )}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {success && isVisible && (
        <p data-cy="success" className="mt-4 text-center text-green-500">
          {success}
        </p>
      )}
    </>
  );
};

export default EditPostForm;
