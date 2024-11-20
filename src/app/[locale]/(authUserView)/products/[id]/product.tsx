import React from "react";
import "../ProductCard.css";

interface ProductProps {
  product: {
    id: string | number;
    title_ka: string;
    image: string;
    description_ka: string;
    price: number;
  };
  locale?: string;
}

export default function Product({ product }: ProductProps): JSX.Element {
  return (
    <div key={product.id} className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-32">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.title_ka}
          className="w-full h-60 object-cover group-hover:scale-110 transition-all duration-300"
        />
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <p className="text-white text-lg font-semibold">{product.title_ka}</p>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">{product.title_ka}</h1>
        <p className="text-gray-600 my-2">{product.description_ka}</p>
        <p className="text-xl text-yellow-500">{product.price} ₾</p>
      </div>
    </div>
  );
}
