import React from "react";
import "../ProductCard.css";

interface ProductProps {
  product: {
    id: string | number;
    title: string;
    image: string;
    description: string;
    price: number;
  };
  locale?: string;
}

export default function Product({ product }: ProductProps): JSX.Element {
  return (
    <div key={product.id} className="container margin-top-20px margin-bottom-20px item">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}
