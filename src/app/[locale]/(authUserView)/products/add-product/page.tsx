"use client";

import { useEffect, useState } from "react";

export default function AddProduct() {
  const initialFormData = {
    title_ka: "",
    description_ka: "",
    price: 0,
    image: "",
    category_ka: "",
    category_en: "",
    title_en: "",
    description_en: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccess("Product added successfully!");
        setFormData(initialFormData);
      } else {
        setError(data.error || "An unexpected error occurred.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-stone-900  shadow-lg rounded-lg m-2">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 dark:text-yellow-200">
        / პროდ. დამატება / Add Product /
      </h1>
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
              className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="description_ka"
              className="block text-gray-700 dark:text-white"
            >
              აღწერა
            </label>
            <textarea
              id="description_ka"
              name="description_ka"
              value={formData.description_ka}
              onChange={handleChange}
              required
              className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description_en"
              className="block text-gray-700 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description_en"
              name="description_en"
              value={formData.description_en}
              onChange={handleChange}
              required
              className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
          <div>
            <label
              htmlFor="category_ka"
              className="block text-gray-700 dark:text-white"
            >
              კატეგორია
            </label>
            <input
              type="text"
              id="category_ka"
              name="category_ka"
              value={formData.category_ka}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-300 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="category_en"
              className="block text-gray-700 dark:text-white"
            >
              Category
            </label>
            <input
              type="text"
              id="category_en"
              name="category_en"
              value={formData.category_en}
              onChange={handleChange}
              required
              className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="block text-gray-700 dark:text-white"
            >
              ფასი / Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 dark:text-white"
            >
              სურათის ბმული / Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="dark:bg-slate-300 text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 mt-4 text-white rounded-md focus:outline-none ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {success && isVisible && (
        <p className="mt-4 text-center text-green-500 fade-out">{success}</p>
      )}
    </div>
  );
}
