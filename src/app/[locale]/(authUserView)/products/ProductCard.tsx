import React from "react";
import "./ProductCard.css";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string | number;
    title: string;
    image: string;
    description: string;
    price: number;
  };
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps): JSX.Element {
  return (
    <div key={product.id} className="item">
      <img
        src={product.image}
        alt={product.title}
        className="item-img"
      />
      <h4 className="item-name">{product.title}</h4>
      <div>${product.price}</div>
      <p className="item-desc">{product.description}</p>
      <div>
        <button className="button">Add to Cart</button>
        <Link
          href={`/${locale}/products/${product.id}`}
          className="moreCardBtn"
        >
          more details
        </Link>
      </div>
    </div>
  );
}
