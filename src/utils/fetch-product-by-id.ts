import { Product } from "@/types/product";

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const appUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${appUrl}/api/products/${id}`, {
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
