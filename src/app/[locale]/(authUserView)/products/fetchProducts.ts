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
  const appUrl = process.env.BASE_URL;
  const productsURL = `${appUrl}/api/products`;
  try {
    const response = await fetch(productsURL, {
      next: {
        revalidate: 0,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
