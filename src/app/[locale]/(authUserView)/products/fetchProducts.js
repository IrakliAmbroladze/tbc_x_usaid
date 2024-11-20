export async function fetchProducts() {
  const appUrl = process.env.AUTH0_BASE_URL
  let productsURL = `${appUrl}/api/products`;
  try {
    const response = await fetch(productsURL);
    const data = await response.json();
    return data;  
  } catch (error) {
    console.error(error);
    return []; 
  }
}
