export async function fetchProducts(sortBy, order) {
  let productsURL
  if(!order){
    productsURL = `https://dummyjson.com/products`
  }else{
    productsURL = `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`;
  }
  
  try {
    const response = await fetch(productsURL);
    const data = await response.json();
    return data.products;
  } catch (error) {
    return "";
  }
}
