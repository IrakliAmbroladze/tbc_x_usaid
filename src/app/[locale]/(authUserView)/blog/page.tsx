import CreateNewItem from "@/components/create-new-item";
import PaginatedBlog from "./PaginatedBlog";
import { Search } from "./search-blog";
import { langIsKa } from "@/utils/lang-is-ka";

interface ProductsProps {
  params: { locale: string };
  searchParams: {
    query?: string;
  };
}
const Blog = ({ searchParams, params }: ProductsProps) => {
  const { locale } = params;
  const query = searchParams?.query || "";
  return (
    <>
      <h2
        data-cy="product-list-title"
        className="text-3xl sm:text-5xl md:text-8xl  m-5 dark:text-white text-black font-bold animate-rise0_25s"
      >
        {langIsKa() ? "ბ ლ ო გ ი" : "B L O G"}
      </h2>
      <div className="flex flex-col m-5 sm:flex-row">
        <div className="flex flex-col sm:items-center sm:ml-5 animate-rise delay-500">
          <div className="w-full">
            <CreateNewItem url={`./blog/add-blog`}>
              {langIsKa() ? "ბლოგის დამატება" : "add new blog"}
            </CreateNewItem>
          </div>
          <div className="w-full">
            <Search />
          </div>
        </div>
        <PaginatedBlog locale={locale} query={query} />;
      </div>
    </>
  );
};

export default Blog;
