import "../ProductCard.css"

export default function Product(props) {
  return (
    <div key={props.product.id} className='container margin-top-20px margin-bottom-20px item'>
      <h1>{props.product.title}</h1>
      <img src={props.product.thumbnail} alt={props.product.title}/>
      <p>{props.product.description}</p>
      <p>{props.product.price}</p>
    </div>
  )
}
