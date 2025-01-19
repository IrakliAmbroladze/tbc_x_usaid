"use client";

import React, { useState, useEffect } from "react";
import { ProductList } from "./ProductList";
import { fetchProducts, Product } from "./fetchProducts";

interface ProductListProps {
  productList?: Product[];
  locale: string;
}

const ClientSideProductList = ({ locale }: ProductListProps): JSX.Element => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts();
      setProductList(result);
    };
    loadProducts();
  }, []);

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

  return (
    <ProductList
      productList={productList}
      locale={locale}
      onDelete={handleDelete}
    />
  );
};

export default ClientSideProductList;
