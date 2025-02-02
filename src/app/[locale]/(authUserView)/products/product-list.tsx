"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./product-cart";

interface ProductListProps {
  productList?: Product[];
  locale: string;
  query?: string;
  sortBy?: string;
  order?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface Product {
  id: string | number;
  title_ka: string;
  title_en: string;
  image: string;
  description_ka: string;
  description_en: string;
  price: number;
}

async function fetchProducts(
  sortBy: string,
  query: string,
  order: string,
  minPrice: number,
  maxPrice: number,
): Promise<Product[]> {
  const productsURL = `/api/products`;
  try {
    const response = await fetch(productsURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        sortBy: `${sortBy}`,
        query: `${query}`,
        order: `${order}`,
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
  sortBy,
  query,
  order,
  minPrice,
  maxPrice,
}: ProductListProps): JSX.Element => {
  const [productList, setProductList] = useState<Product[]>([]);
  const apiSortBy = sortBy || "";
  const apiQuery = query || "";
  const apiOrder = order || "";
  const apiMinPrice = minPrice || 0;
  const apiMaxPrice = maxPrice || 1000000;
  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts(
        apiSortBy,
        apiQuery,
        apiOrder,
        apiMinPrice,
        apiMaxPrice,
      );
      setProductList(result);
    };
    loadProducts();
  }, [apiSortBy, apiQuery, apiOrder, apiMinPrice, apiMaxPrice]);

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
      console.log(`Product ${id} deleted`);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  interface ProductListProps {
    productList: Product[];
    locale: string;
    onDelete: (id: number | string) => void;
  }

  interface Product {
    id: string | number;
    title_ka: string;
    title_en: string;
    image: string;
    description_ka: string;
    description_en: string;
    price: number;
  }

  const ProductList = ({
    productList,
    locale,
    onDelete,
  }: ProductListProps): JSX.Element => {
    return (
      <div className="w-full max-w-[1110px] mx-auto mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 justify-items-center">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <ProductList
      productList={productList}
      locale={locale}
      onDelete={handleDelete}
    />
  );
};

export default ProductList;
