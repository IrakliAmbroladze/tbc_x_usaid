import Image from "next/image";
import { fetchProductById } from "@/utils/fetch-product-by-id";
import { langIsKa } from "@/utils/lang-is-ka";
import { Link } from "i18n/routing";
import { AddToCartButton } from "@/components/AddToCartButton";
import { FiArrowLeft, FiEdit3 } from "react-icons/fi";

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
      className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 mt-5 p-5"
    >
      <div className="flex justify-between">
        <Link href={"./"} className="text-black text-5xl">
          <FiArrowLeft />
        </Link>
        <Link
          href={`./${id}/edit-product`}
          className="w-20 px-4 py-2 bg-[#86cd82] rounded-3xl shadow-sm hover:text-black transition-transform duration-150 ease-in-out active:scale-95 text-center text-black flex items-center justify-center text-xl"
        >
          <FiEdit3 />
        </Link>
      </div>
      <div className="relative group">
        <Image
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
          src={product.image}
          alt={product.title_ka}
          className="w-full h-60 object-cover transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{description}</p>
        <p className="text-xl text-yellow-500 mt-4 font-semibold text-center my-5">
          {product.price} ₾
        </p>
        <div className="flex justify-between text-black">
          <AddToCartButton product_id={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
