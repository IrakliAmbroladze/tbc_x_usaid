import React from "react";
import ProductCard from "./ProductCard";
import "./ProductCard.css";

interface ProductListProps {
  productList: Array<{
    id: string | number;
    title: string;
    image: string;
    description: string;
    price: number;
  }>;
  locale: string;
}

export const ProductList = ({ productList, locale }: ProductListProps): JSX.Element => {
  return (
    <div className="container margin-bottom-20px">
      <div className="items margin-top-20px">
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
};
