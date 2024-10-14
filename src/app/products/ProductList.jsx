import { ProductCard } from "./ProductCard"
import "./ProductCard.css"

export const ProductList = (props)=> {
  return (
    <div className="container margin-top-20px margin-bottom-20px">
      <h2 style={{textAlign: "center"}}>Item Shop</h2>
      <div className="items margin-top-20px">
        {props.productList.map((product)=>(
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

