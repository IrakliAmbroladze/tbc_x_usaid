import React from "react";
import { products } from "./Item_data";
import ProductCart from "./ProductCart";

export function ItemGrid(): JSX.Element {
  return (
    <div className="item_grid">
      {products.map((product) => (
        <ProductCart key={product.id} data={product} />
      ))}
    </div>
  );
}
