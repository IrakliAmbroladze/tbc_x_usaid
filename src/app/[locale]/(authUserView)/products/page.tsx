import React from "react";
import { fetchProducts, Product } from "./fetchProducts";
import { ProductList } from "./ProductList";
// import { SortingButtons } from "../../../components/small/SortingButtons";
// import { Search } from "./search";

interface ProductsProps {
  params: { locale: string };
}

export default async function Products({
  params,
}: ProductsProps): Promise<JSX.Element> {
  const productList: Product[] = await fetchProducts();
  const { locale } = params;
  const productTitle = locale === "ka" ? "პროდუქტები" : "Item shop";
  return (
    <div className="container dark:text-white">
      <h2 style={{ textAlign: "center" }} className="margin-top-20px">
        {productTitle}
      </h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Search />
        <SortingButtons /> */}
      </div>
      <ProductList productList={productList} locale={locale} />
    </div>
  );
}
