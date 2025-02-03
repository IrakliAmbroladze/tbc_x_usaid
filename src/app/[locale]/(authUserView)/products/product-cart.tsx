import Link from "next/link";
// import { useTranslations } from "next-intl";
import { DeleteProductBtn, EditProductBtn } from "./cart-buttons";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";
import { lusitana } from "@/ui/fonts";
// import { FiShoppingCart } from "react-icons/fi";

interface ProductCardProps {
  product: Product;
  locale: string;
  onDelete: (id: number | string) => void;
}

export interface Product {
  id: string | number;
  title_ka: string;
  title_en: string;
  image: string;
  description_ka: string;
  description_en: string;
  price: number;
}

export default function ProductCard({
  product,
  locale,
  onDelete,
}: ProductCardProps): JSX.Element {
  const title = locale === "ka" ? product.title_ka : product.title_en;
  // const description =
  //   locale === "ka" ? product.description_ka : product.description_en;
  // const t = useTranslations("Add");

  return (
    <div
      key={product.id}
      className={`${lusitana.className} relative flex flex-col items-center gap-4  dark:text-white text-black `}
    >
      <div className="px-5 bg-white rounded-[45px]">
        <div className="bg-white rounded-[45px] relative group overflow-hidden h-80 flex items-center">
          <Link
            href={`/${locale}/products/${product.id}`}
            className="overflow-hidden rounded-md "
          >
            <Image
              width={240}
              height={135}
              src={product.image}
              alt={title || "პროდუქტის სურათი"}
              className="w-auto group-hover:scale-110 group-hover:transition-all group-hover:duration-[3000ms] group-hover:ease-in-out"
              priority
              crossOrigin="anonymous"
            />
            {/* <div className="text-white text-xl flex group "> */}
          </Link>
          <div className="absolute bottom-2 z-10 hidden group-hover:block group-hover:animate-rise0_25s w-full transition-transform duration-150 ease-in-out active:scale-95">
            <AddToCartButton product_id={product.id} />
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="flex flex-col items-center">
        <h4 className="item-name font-bold">
          {title || "სათაური არ არის ხელმისაწვდომი"}
        </h4>
        <div>{product.price} ₾</div>
      </div>
      {/* <p className="text-[0.9rem] line-clamp-1">
        {description || "აღწერა არ არის ხელმისაწვდომი"}
      </p> */}
      <div className="flex gap-2 absolute right-0 mr-3 mt-3">
        <EditProductBtn product_id={product.id} onDelete={onDelete} />
        <DeleteProductBtn product_id={product.id} onDelete={onDelete} />
      </div>
    </div>
  );
}
