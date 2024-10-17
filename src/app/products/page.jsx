import { fetchProducts } from "./fetchProducts";
import { ProductList } from "./ProductList";
import { SortingButtons } from "../components/small/SortingButtons.jsx";

export default async function Products() {
  const productList = await fetchProducts();

  const header = <h2 style={{textAlign: "center"}} className="margin-top-20px">
                    Item Shop
                </h2>;

  const searchAndSorting = <div style={{display: "flex", justifyContent: "space-between"}}>
                              <input placeholder='search'></input>
                              <SortingButtons />
                            </div>

  return (
    <div className="container">
      {header}
      {searchAndSorting}
      <ProductList productList={productList} />
    </div>
  );
}
