import { ProductCard } from "./ProductCard"
import "./ProductCard.css"

export const ProductList = (props)=> {
  return (
    <main className="main">
      <h2>Item Shop</h2>
      <div className="items">
        {props.productList.map((product)=>(
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

