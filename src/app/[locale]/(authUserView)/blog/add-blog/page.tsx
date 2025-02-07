"use client";

import { useState } from "react";

export default function AddPostPage() {
  const [titleKa, setTitleKa] = useState("");
  const [bodyKa, setBodyKa] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = {
      title_ka: titleKa,
      body_ka: bodyKa,
      title_en: titleEn,
      body_en: bodyEn,
    };

    try {
      const response = await fetch("/api/add-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Post added successfully!");
        setErrorMessage(null);

        setTitleKa("");
        setBodyKa("");
        setTitleEn("");
        setBodyEn("");
      } else {
        setSuccessMessage(null);
        setErrorMessage(data.error || "Failed to add post.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while submitting the post.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Add New Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="titleKa"
            className="block text-lg font-medium text-gray-700 dark:text-gray-200"
          >
            Title (KA):
          </label>
          <input
            type="text"
            id="titleKa"
            value={titleKa}
            onChange={(e) => setTitleKa(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-300"
          />
        </div>
        <div>
          <label
            htmlFor="bodyKa"
            className="block text-lg font-medium text-gray-700 dark:text-gray-200"
          >
            Body (KA):
          </label>
          <textarea
            id="bodyKa"
            value={bodyKa}
            onChange={(e) => setBodyKa(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-300"
          />
        </div>
        <div>
          <label
            htmlFor="titleEn"
            className="block text-lg font-medium text-gray-700 dark:text-gray-200"
          >
            Title (EN):
          </label>
          <input
            type="text"
            id="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-300"
          />
        </div>
        <div>
          <label
            htmlFor="bodyEn"
            className="block text-lg font-medium text-gray-700 dark:text-gray-200"
          >
            Body (EN):
          </label>
          <textarea
            id="bodyEn"
            value={bodyEn}
            onChange={(e) => setBodyEn(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-md shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
        >
          Add Post
        </button>
      </form>

      {errorMessage && (
        <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-green-600 text-center">{successMessage}</p>
      )}
    </div>
  );
}
