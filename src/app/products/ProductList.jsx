import { ProductCard } from "./ProductCard"
import "./ProductCard.css"

export const ProductList = (props)=> {
  return (
    <div className="container margin-bottom-20px">
      <div className="items margin-top-20px">
        {props.productList.map((product)=>(
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

