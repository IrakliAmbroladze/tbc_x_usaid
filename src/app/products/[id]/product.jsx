import "../ProductCard.css"

export default function Product(props) {
  return (
    <div key="props.product.id" className='container item'>
      <h1>{props.product.title}</h1>
      <img src={props.product.thumbnail} alt={props.product.title}/>
      <p>{props.product.description}</p>
      <p>{props.product.price}</p>
    </div>
  )
}
