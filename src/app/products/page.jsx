"use client"
import { useEffect, useState } from "react"
import { ProductList } from "./ProductList";
import './ProductCard.css'

const productsURL = 'https://dummyjson.com/products';

export default function Products() {
   const [productList, setProductList] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

   const itemsPerPage = 9;

   useEffect(()=>{
     async function fetchProducts() {
       try {
         const response = await fetch(`${productsURL}?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`);
         const data = await response.json();
         setProductList(data.products);
         setTotalPages(Math.ceil(data.total / itemsPerPage));
        } catch (error) {
          setProductList([]);
        }
      }
    fetchProducts();
  },[currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div>
      <ProductList productList={productList} />
      
      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
