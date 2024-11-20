type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  [key: string]: any;
};

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
