import PaginatedBlog from "./PaginatedBlog";
import { Search } from "./search-blog";

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
        {locale == "ka" ? "ბ ლ ო გ ი" : "B L O G"}
      </h2>
      <div className="flex justify-center">
        <div className="w-72">
          <Search />
        </div>
      </div>
      <PaginatedBlog locale={locale} query={query} />;
    </>
  );
};

export default Blog;
