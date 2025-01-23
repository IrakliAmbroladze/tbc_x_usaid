export async function fetchProducts(
  query: string,
  sortBy: string,
  order: string,
) {
  let productsURL;
  if (query) {
    if (sortBy && order) {
      productsURL = `https://dummyjson.com/products/search?q=${query}&sortBy=${sortBy}&order=${order}`;
    } else {
      productsURL = `https://dummyjson.com/products/search?q=${query}`;
    }
  } else {
    if (sortBy && order) {
      productsURL = `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`;
    } else {
      productsURL = `https://dummyjson.com/products`;
    }
  }

  try {
    const response = await fetch(productsURL);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log(error);
    return "";
  }
}
