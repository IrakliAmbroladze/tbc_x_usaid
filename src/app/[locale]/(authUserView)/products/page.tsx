import { Link } from "i18n/routing";
import ProductList from "./product-list";
import { Search } from "./search-and-sort";
import { SortingButtons } from "./search-and-sort";

interface ProductsProps {
  params: { locale: string };
  searchParams: {
    query?: string;
    order?: string;
    sortBy?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

export default async function Products({
  searchParams,
  params,
}: ProductsProps): Promise<JSX.Element> {
  const { query } = searchParams || "";
  const { order } = searchParams || "";
  const { sortBy } = searchParams || "";
  const { minPrice } = searchParams || 0;
  const { maxPrice } = searchParams || 1000000;

  const { locale } = params;
  const productTitle = locale === "ka" ? "პროდუქტები" : "Item shop";
  const add_new_product =
    locale === "ka" ? "ახალი პროდუქტის დამატება" : "Add New Product";
  return (
    <div className="w-full max-w-[1110px] mx-auto dark:text-white mt">
      <h2
        data-cy="product-list-title"
        style={{ textAlign: "center" }}
        className="m-5"
      >
        {productTitle}
      </h2>
      <div className="flex justify-between">
        <Link
          data-cy="add-new-product"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          href={"./products/add-product"}
        >
          {add_new_product}
        </Link>
        <Search />
        <SortingButtons />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      <ProductList
        locale={locale}
        query={query}
        order={order}
        sortBy={sortBy}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
}
