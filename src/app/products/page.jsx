import { fetchProducts } from "./fetchProducts";
import { ProductList } from "./ProductList";

export default async function Products() {
  const productList = await fetchProducts();
  return (
    <>
      <h2 
        style={{textAlign: "center"}}
        className="margin-top-20px"
      >Item Shop</h2>
      <ProductList productList={productList} />
    </>
  );
}
