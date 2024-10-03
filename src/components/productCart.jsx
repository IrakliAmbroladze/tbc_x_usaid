import React from 'react'

const ProductCart =(props) => {
  const {id, name, image, description} = props.data;
  return (
    <div key={id}>
      <img src={image} alt={name} style={{width: 150, height: 150}}></img>
      <h4>{name}</h4>
      <div>{description}</div>
      <div>
      <button>
        Add to cart
      </button>

      </div>
    </div>
  )
}

export default ProductCart