"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./product-cart";

interface ProductListProps {
  productList?: Product[];
  locale: string;
  query?: string;
  sortBy?: string;
  order?: string;
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
}: ProductListProps): JSX.Element => {
  const [productList, setProductList] = useState<Product[]>([]);
  const apiSortBy = sortBy || "";
  const apiQuery = query || "";
  const apiOrder = order || "";
  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts(apiSortBy, apiQuery, apiOrder);
      setProductList(result);
    };
    loadProducts();
  }, [apiSortBy, apiQuery, apiOrder]);

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

      // Update the product list after successful deletion
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

  // async function fetchProducts(): Promise<Product[]> {
  //   const productsURL = `/api/products`;
  //   try {
  //     const response = await fetch(productsURL);
  //     return response.json();
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     return [];
  //   }
  // }

  const ProductList = ({
    productList,
    locale,
    onDelete,
  }: ProductListProps): JSX.Element => {
    return (
      <div className="w-full max-w-[1110px] mx-auto mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 justify-items-center mt-5">
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
