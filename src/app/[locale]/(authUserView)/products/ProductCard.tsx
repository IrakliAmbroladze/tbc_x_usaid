import React from "react";
import "./ProductCard.css";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ProductCardProps {
  product: {
    id: string | number;
    title_ka: string;
    title_en: string;
    image: string;
    description_ka: string;
    description_en: string;
    price: number;
  };
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps): JSX.Element {
  const title = locale === "ka" ? product.title_ka : product.title_en;
  const description = locale === "ka" ? product.description_ka : product.description_en;
  const t = useTranslations("Add");

  return (
    <div key={product.id} className="item">
      <img
        src={product.image}
        alt={title || "პროდუქტის სურათი"}
        className="item-img"
      />
      <h4 className="item-name">{title || "სათაური არ არის ხელმისაწვდომი"}</h4>
      <div>{product.price} ₾</div>
      <p className="item-desc">
        {description || "აღწერა არ არის ხელმისაწვდომი"}
      </p>
      <div>
        <button className="button">{t("Add to cart")}</button>
        <Link
          href={`/${locale}/products/${product.id}`}
          className="moreCardBtn"
        >
          {t("More details")}
        </Link>
      </div>
    </div>
  );
}
