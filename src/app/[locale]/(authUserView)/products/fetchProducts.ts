export interface Product {
  id: string | number;
  title_ka: string;
  title_en: string;
  image: string;
  description_ka: string;
  description_en: string;
  price: number;
}

export async function fetchProducts(): Promise<Product[]> {
  const appUrl = process.env.AUTH0_BASE_URL;
  const productsURL = `${appUrl}/api/products`;
  try {
    const response = await fetch(productsURL);
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
