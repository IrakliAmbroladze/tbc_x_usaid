export interface SingleProduct {
  id: string | number;
  title_ka: string;
  title_en: string;
  image: string;
  description_ka: string;
  description_en: string;
  price: number;
}

export async function fetchProduct(id: string): Promise<SingleProduct | null> {
  const appUrl = process.env.AUTH0_BASE_URL;
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
}
