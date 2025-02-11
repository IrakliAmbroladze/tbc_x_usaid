import { Link } from "i18n/routing";
import ProductList from "./product-list";
import { Search } from "./search-and-sort";
import { SortingButtons } from "./search-and-sort";
import { lusitana } from "@/ui/fonts";
import { FiPackage, FiShoppingCart } from "react-icons/fi";

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
  const add_new_product =
    locale === "ka" ? "ახალი პროდუქტის დამატება" : "Add New Product";
  return (
    <div>
      <Link
        href={"/cart"}
        className="bg-blue-950 fixed right-1 top-16 z-50 m-2 p-1 rounded-full text-white"
      >
        <FiShoppingCart size={20} />
      </Link>
      <Link
        href={"/orders"}
        className="bg-green-950 fixed right-9 top-16 z-50 m-2 p-1 rounded-full text-white"
      >
        <FiPackage size={20} />
      </Link>
      <h2
        data-cy="product-list-title"
        className={`${lusitana.className} text-3xl sm:text-5xl md:text-8xl  m-5 dark:text-white text-black font-bold animate-rise0_25s`}
      >
        {productTitle}
      </h2>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col sm:items-center sm:ml-5 animate-rise delay-500">
          <Search locale={locale} />
          <SortingButtons locale={locale} />
          <Link
            data-cy="add-new-product"
            href={"./products/add-product"}
            className="transition-transform duration-150 ease-in-out hover:text-[#222e46] active:scale-95 p-3 mt-2 mb-4 sm:justify-between justify-center py-2 bg-[#86cd82] text-white rounded-lg flex items-center w-full "
          >
            {add_new_product}
          </Link>
        </div>
        <div className="w-full max-w-[1110px] mx-auto dark:text-white mt animate-rise delay-1000">
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
