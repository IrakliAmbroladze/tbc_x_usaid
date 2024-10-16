export async function fetchProduct(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    return response.json();
  } catch (error) {
    return "";
  }
}