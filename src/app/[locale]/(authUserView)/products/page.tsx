import React from "react";
import { Link } from "i18n/routing";
import ClientSideProductList from "./client-side-productlist";

interface ProductsProps {
  params: { locale: string };
}

export default async function Products({
  params,
}: ProductsProps): Promise<JSX.Element> {
  // const productList: Product[] = await fetchProducts();
  const { locale } = params;
  const productTitle = locale === "ka" ? "პროდუქტები" : "Item shop";
  const add_new_product =
    locale === "ka" ? "ახალი პროდუქტის დამატება" : "Add New Product";
  return (
    <div className="container dark:text-white mt">
      <h2
        data-cy="product-list-title"
        style={{ textAlign: "center" }}
        className="margin-top-20px"
      >
        {productTitle}
      </h2>
      <Link
        data-cy="add-new-product"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        href={"./products/add-product"}
      >
        {add_new_product}
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      <ClientSideProductList locale={locale} />
    </div>
  );
}
