import { fetchProducts } from "./fetchProducts.js";
import { ProductList } from "./ProductList";
import { SortingButtons } from "../../../components/small/SortingButtons";
import { Search } from "./search";

export default async function Products({ params, searchParams }) {
  const { query, sortBy, order } = searchParams || "";
  const productList = await fetchProducts(query, sortBy, order);
  const { locale } = params;

  const header = (
    <h2 style={{ textAlign: "center" }} className="margin-top-20px">
      Item Shop
    </h2>
  );

  const searchAndSorting = (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Search />
      <SortingButtons />
    </div>
  );

  return (
    <div className="container">
      {header}
      {searchAndSorting}
      <ProductList productList={productList} locale={locale} />
    </div>
  );
}