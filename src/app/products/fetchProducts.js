export async function fetchProducts() {
  const productsURL = 'https://dummyjson.com/products';
  try {
    const response = await fetch(productsURL);
    const data = await response.json();
    return data.products;
  } catch (error) {
    return "";
  }
}