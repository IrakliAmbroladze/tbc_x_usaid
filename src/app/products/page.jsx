import { fetchProducts } from "./fetchProducts";
import { ProductList } from "./ProductList";

export default async function Products() {
  const productList = await fetchProducts();
  return <ProductList productList={productList} />;
}
