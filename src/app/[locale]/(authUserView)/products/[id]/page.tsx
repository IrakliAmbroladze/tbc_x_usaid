import Image from "next/image";
import { fetchProductById } from "@/utils/fetch-product-by-id";
import { langIsKa } from "@/utils/lang-is-ka";
import { Link } from "i18n/routing";

const ProductPage = async ({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  const { id } = params;
  const product = await fetchProductById(id);
  if (!product) return <p>product does not exist</p>;

  const title = langIsKa() ? product.title_ka : product.title_en;
  const description = langIsKa()
    ? product.description_ka
    : product.description_en;

  return (
    <div
      key={product.id}
      className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 mt-32"
    >
      <div className="relative group">
        <Image
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
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
        <div className="flex justify-between text-black">
          <Link href={"./"}>go to products list</Link>
          <Link href={`./${id}/edit-product`}>edit product</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
