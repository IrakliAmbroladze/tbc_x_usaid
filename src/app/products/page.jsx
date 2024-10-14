"use client"
import { useEffect, useState } from "react"
import { ProductList } from "./ProductList";

const productsURL = 'https://dummyjson.com/products';

export default function Products() {
   const [productList, setProductList] = useState([]);

   useEffect(()=>{
     async function fetchProducts() {
       try {
         const response = await fetch(productsURL);
         const data = await response.json();
         setProductList(data.products);
        } catch (error) {
          setProductList([]);
        }
      }
    fetchProducts();
  },[]);

  return <ProductList productList={productList} />
}
