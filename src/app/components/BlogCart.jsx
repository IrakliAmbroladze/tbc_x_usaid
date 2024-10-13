import React from 'react'
import BtnReadMore from './small/BtnReadMore';

const BlogCart =(props) => {
  const {id, name, image, description} = props.data;
  return (
    <div key={id} className='cartClass'>
      <img src={image.src} alt={name} style={{width: '50%', height: '50%'}}></img>
      <h4>{name}</h4>
      <div>{description}</div>
      <BtnReadMore />
    </div>
  )
}

export default BlogCart