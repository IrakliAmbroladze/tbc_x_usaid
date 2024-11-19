import { fetchProduct } from "./fetchProduct";
import Product from "./product";

export default async function ProductPage({ params }) {
  const { id, locale } = params;
  const product = await fetchProduct(id);
  return <Product key={product.id} product={product} locale={locale} />;
}
