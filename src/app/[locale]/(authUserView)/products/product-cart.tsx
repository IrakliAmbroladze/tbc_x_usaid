import Link from "next/link";
import { useTranslations } from "next-intl";
import { DeleteProductBtn, BuyProductBtn } from "./cart-buttons";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";

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
  const description =
    locale === "ka" ? product.description_ka : product.description_en;
  const t = useTranslations("Add");

  return (
    <div
      key={product.id}
      className="flex flex-col items-center gap-4 mt-8 border border-r-stone-200 p-2 rounded-xl dark:text-white text-black"
    >
      <Image
        width={240}
        height={135}
        src={product.image}
        alt={title || "პროდუქტის სურათი"}
        className="rounded-md w-auto h-auto"
        priority
        crossOrigin="anonymous"
      />
      <h4 className="item-name ">{title || "სათაური არ არის ხელმისაწვდომი"}</h4>
      <div>{product.price} ₾</div>
      <p className="text-[0.9rem] line-clamp-1">
        {description || "აღწერა არ არის ხელმისაწვდომი"}
      </p>
      <div className="flex gap-2">
        <DeleteProductBtn product_id={product.id} onDelete={onDelete} />
        <BuyProductBtn product_id={product.id} />
        <AddToCartButton product_id={product.id} />

        <Link href={`/${locale}/products/${product.id}`}>
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            {t("More details")}
          </button>
        </Link>
      </div>
    </div>
  );
}
