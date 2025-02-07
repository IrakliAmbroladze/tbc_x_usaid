import PaginatedBlog from "./PaginatedBlog";

const Blog = ({ params }: { params: { locale: string } }) => {
  const { locale } = params;
  return (
    <>
      <h2
        data-cy="product-list-title"
        className="text-3xl sm:text-5xl md:text-8xl  m-5 dark:text-white text-black font-bold animate-rise0_25s"
      >
        {locale == "ka" ? "ბ ლ ო გ ი" : "B L O G"}
      </h2>
      <PaginatedBlog locale={locale} />;
    </>
  );
};

export default Blog;
