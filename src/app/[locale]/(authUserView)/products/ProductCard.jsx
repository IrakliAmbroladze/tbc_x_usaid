import "./ProductCard.css";
import Link from "next/link";

export default function ProductCard(props) {
  return (
    <div key={props.product.id} className="item">
      <img
        src={props.product.image}
        alt={props.product.title}
        className="item-img"
      />
      <h4 className="item-name">{props.product.title}</h4>
      <div>${props.product.price}</div>
      <p className="item-desc">{props.product.description}</p>
      <div>
        <button className="button">Add to Cart</button>
        <Link href={`/products/${props.product.id}`} className="moreCardBtn">
          more details
        </Link>
      </div>
    </div>
  );
}
