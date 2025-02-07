"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./product-cart";
import { Product, ProductListProps } from "@/types/product";

async function fetchProducts(
  sortBy: string,
  query: string,
  order: string,
  minPrice: number,
  maxPrice: number,
): Promise<Product[]> {
  try {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        sortBy,
        query,
        order,
        minPrice: `${minPrice}`,
        maxPrice: `${maxPrice}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ProductList = ({
  locale,
  sortBy = "",
  query = "",
  order = "",
  minPrice = 0,
  maxPrice = 1000000,
}: ProductListProps): JSX.Element => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts(
        sortBy,
        query,
        order,
        minPrice,
        maxPrice,
      );
      setProductList(result);
    };
    loadProducts();
  }, [sortBy, query, order, minPrice, maxPrice]);

  const handleDelete = async (id: number | string) => {
    try {
      const response = await fetch("/api/delete-product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${await response.text()}`);
      }

      setProductList((prevList) =>
        prevList.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="w-full max-w-[1110px] mx-auto mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 justify-items-center">
        {productList.map((product, index) => (
          <div
            key={product.id}
            className={`border border-r-stone-200 p-2 
              ${index % 5 !== 0 ? "rounded-[45px]" : ""}
              ${index % 2 !== 0 ? "mt-20" : ""}
              ${index % 3 !== 0 ? "mt-10" : ""}`}
          >
            <ProductCard
              product={product}
              locale={locale}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
