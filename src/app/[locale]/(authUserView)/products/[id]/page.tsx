import Image from "next/image";

interface SingleProduct {
  id: string | number;
  title_ka: string;
  title_en: string;
  image: string;
  description_ka: string;
  description_en: string;
  price: number;
}
interface ProductPageProps {
  params: { id: string; locale?: string };
}
interface ProductProps {
  product: SingleProduct;
  locale?: string;
}

const fetchProduct = async (id: string): Promise<SingleProduct | null> => {
  const appUrl = process.env.BASE_URL;
  try {
    const response = await fetch(`${appUrl}/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product: SingleProduct = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const Product = ({ product, locale }: ProductProps): JSX.Element => {
  const title = locale === "ka" ? product.title_ka : product.title_en;
  const description =
    locale === "ka" ? product.description_ka : product.description_en;

  return (
    <div
      key={product.id}
      className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 mt-32"
    >
      <div className="relative group">
        <Image
          width={384}
          height={240}
          layout="responsive"
          src={product.image}
          alt={product.title_ka}
          className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-0 left-0 bg-black bg-opacity-60 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <p className="text-white text-lg font-semibold">{title}</p>
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{description}</p>
        <p className="text-xl text-yellow-500 mt-4 font-semibold">
          {product.price} ₾
        </p>
      </div>
    </div>
  );
};

const ProductPage = async ({
  params,
}: ProductPageProps): Promise<JSX.Element> => {
  const { id, locale } = params;
  const product = await fetchProduct(id);
  if (!product) {
    return <p>product does not exist</p>;
  }
  return <Product key={product.id} product={product} locale={locale} />;
};

export default ProductPage;
