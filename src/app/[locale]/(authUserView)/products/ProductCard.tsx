import React from "react";
import "./ProductCard.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Product } from "./fetchProducts";
import DeleteProduct from "./delete-product";
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
    <div key={product.id} className="item ">
      <Image
        width={120}
        height={67.5}
        src={product.image}
        alt={title || "პროდუქტის სურათი"}
        className="item-img"
        layout="responsive"
      />
      <h4 className="item-name ">{title || "სათაური არ არის ხელმისაწვდომი"}</h4>
      <div>{product.price} ₾</div>
      <p className="item-desc line-clamp-1">
        {description || "აღწერა არ არის ხელმისაწვდომი"}
      </p>
      <div>
        <DeleteProduct product_id={product.id} onDelete={onDelete} />

        <Link
          href={`/${locale}/products/${product.id}`}
          className="moreCardBtn"
        >
          {t("More details")}
        </Link>
        {/* <button className="button">{t("Add to cart")}</button> */}
      </div>
    </div>
  );
}
