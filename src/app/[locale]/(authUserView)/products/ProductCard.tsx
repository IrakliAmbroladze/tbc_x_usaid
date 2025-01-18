import React from "react";
import "./ProductCard.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Product } from "./fetchProducts";
import { DeleteProductBtn, BuyProductBtn } from "./cart-buttons";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  locale: string;
  onDelete: (id: number | string) => void;
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
      className="flex flex-col items-center gap-4 mt-8 border border-r-stone-200 p-2 rounded-xl"
    >
      <Image
        width={120}
        height={67.5}
        src={product.image}
        alt={title || "პროდუქტის სურათი"}
        className="item-img rounded-md"
        layout="responsive"
      />
      <h4 className="item-name ">{title || "სათაური არ არის ხელმისაწვდომი"}</h4>
      <div>{product.price} ₾</div>
      <p className="item-desc line-clamp-1">
        {description || "აღწერა არ არის ხელმისაწვდომი"}
      </p>
      <div className="flex gap-2">
        <DeleteProductBtn product_id={product.id} onDelete={onDelete} />
        <BuyProductBtn product_id={product.id} />

        <Link href={`/${locale}/products/${product.id}`}>
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            {t("More details")}
          </button>
        </Link>
        {/* <button className="button">{t("Add to cart")}</button> */}
      </div>
    </div>
  );
}
