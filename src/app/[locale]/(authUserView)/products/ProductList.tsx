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
    <div className="container margin-bottom-20px">
      <div className="items margin-top-20px">
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
