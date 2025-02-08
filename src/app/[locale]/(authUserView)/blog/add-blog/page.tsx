"use client";

import { useState } from "react";

export default function AddPostPage({
  params,
}: {
  params: { locale: string };
}) {
  const [titleKa, setTitleKa] = useState("");
  const [bodyKa, setBodyKa] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { locale } = params;

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
    <div className="m-10 p-6 bg-white dark:bg-stone-700 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        {locale == "ka" ? "პოსტის დამატება" : "Add Post"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-10 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div>
              <label
                htmlFor="titleKa"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                სათაური
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
                მთავარი ტექსტი
              </label>
              <textarea
                id="bodyKa"
                value={bodyKa}
                onChange={(e) => setBodyKa(e.target.value)}
                required
                className="min-h-40 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-300"
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="titleEn"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
              >
                Title
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
                Body
              </label>
              <textarea
                id="bodyEn"
                value={bodyEn}
                onChange={(e) => setBodyEn(e.target.value)}
                required
                className="min-h-40 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="py-3 px-6 bg-gray-600 text-white font-bold rounded-md shadow-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-400"
        >
          {locale == "ka" ? "დამატება" : "Add"}
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
