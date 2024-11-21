import React from "react";
import { fetchProduct } from "./fetchProduct";
import Product from "./product";

interface ProductPageProps {
  params: { id: string; locale?: string };
}

export default async function ProductPage({
  params,
}: ProductPageProps): Promise<JSX.Element> {
  const { id, locale } = params;
  const product = await fetchProduct(id);
  if (!product) {
    return <p>product does not exist</p>;
  }
  return <Product key={product.id} product={product} locale={locale} />;
}
