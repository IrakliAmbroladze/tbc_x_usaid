import { fetchProducts } from "./fetchProducts";
import { ProductList } from "./ProductList";
import { SortingButtons } from "../components/small/SortingButtons.jsx";

export default async function Products() {
  const productList = await fetchProducts();
  return (
    <>
      <h2 
        style={{textAlign: "center"}}
        className="margin-top-20px"
      >Item Shop</h2>
      <SortingButtons />
      <ProductList productList={productList} />
    </>
  );
}
