import React from "react";
import ProductCard from "./ProductCard";
import "./ProductCard.css";
import { Product } from "./fetchProducts";

interface ProductListProps {
  productList: Product[];
  locale: string;
  onDelete: (id: number | string) => void;
}

export const ProductList = ({
  productList,
  locale,
  onDelete,
}: ProductListProps): JSX.Element => {
  return (
    <div className="w-full max-w-[1110px] mx-auto mb-5">
      <div className="items mt-5">
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
