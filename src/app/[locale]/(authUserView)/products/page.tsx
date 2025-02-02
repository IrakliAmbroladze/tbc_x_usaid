// import { Link } from "i18n/routing";
import ProductList from "./product-list";
import { Search } from "./search-and-sort";
import { SortingButtons } from "./search-and-sort";
import { lusitana } from "@/ui/fonts";

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
  const productTitle = locale === "ka" ? "პროდუქტები" : "P R O D U C T S";
  // const add_new_product =
  //   locale === "ka" ? "ახალი პროდუქტის დამატება" : "Add New Product";
  return (
    <div>
      <h2
        data-cy="product-list-title"
        className={`${lusitana.className} text-3xl sm:text-5xl md:text-8xl  m-5 dark:text-white text-black font-bold`}
      >
        {productTitle}
      </h2>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col sm:items-center sm:ml-5">
          <Search />
          <SortingButtons />
          {/* <Link
            data-cy="add-new-product"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            href={"./products/add-product"}
          >
            {add_new_product}
          </Link> */}
        </div>
        <div className="w-full max-w-[1110px] mx-auto dark:text-white mt">
          <ProductList
            locale={locale}
            query={query}
            order={order}
            sortBy={sortBy}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
      </div>
    </div>
  );
}
