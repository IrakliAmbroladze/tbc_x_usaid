export async function fetchProduct(id) {
  const appUrl = process.env.AUTH0_BASE_URL;
  try {
    const response = await fetch(`${appUrl}/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return {};
  }
}
