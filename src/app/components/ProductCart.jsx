import React from 'react'
import BtnAddCart from './small/BtnAddCart'

const ProductCart =(props) => {
  const {id, name, image, description} = props.data;
  return (
    <div key={id} className='cartClass'>
      <img src={image.src} alt={name} style={{width: '50%', height: '50%'}}></img>
      <h4>{name}</h4>
      <div>{description}</div>
      <BtnAddCart />
    </div>
  )
}

export default ProductCart
