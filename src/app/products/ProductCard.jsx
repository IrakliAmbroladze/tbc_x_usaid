import "./ProductCard.css"
import Link from "next/link"

export const ProductCard = (props) => {
  return (
    <div className="item">
        <div style={{
          height: 120
        }}>
        <img 
          src={props.product.thumbnail} 
          alt={props.product.title}
          className="item-img"
          style={{
            height: '100%',
            width: '100%',
          }}
          />

        </div>
        <h4 className="item-name">{props.product.title}</h4>
        <div>${props.product.price}</div>
        <p className="item-desc">{props.product.description}</p>
        <div>
          <button className="button">Add to Cart</button>
          <Link href={`/products/${props.product.id}`} className="moreCardBtn">more details</Link>
        </div>
    </div>
  )
}
