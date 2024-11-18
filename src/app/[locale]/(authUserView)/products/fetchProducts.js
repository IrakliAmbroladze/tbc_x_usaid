export async function fetchProducts() {
  let productsURL = "http://localhost:3000/api/products";
  try {
    const response = await fetch(productsURL);
    const data = await response.json();
    return data;  
  } catch (error) {
    console.error(error);
    return []; 
  }
}
