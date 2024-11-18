import ProductCard from "./ProductCard";
import { fetchProducts } from "./fetchProducts";

export const ProductList = async () => {
  const productList = await fetchProducts();
  return (
    <div className="container margin-bottom-20px">
      <div className="items margin-top-20px">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
