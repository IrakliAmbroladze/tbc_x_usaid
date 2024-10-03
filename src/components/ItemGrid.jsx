import React from 'react'
// import './ItemGrid.css'
// import { Item_card } from '../Item_data'
import { products } from './Item_data'
// import { keyboard } from '@testing-library/user-event/dist/keyboard'
import ProductCart from './productCart'

export function ItemGrid() {

  return (
    <div className='item_grid'>
      {products.map((product, key) =>
        <ProductCart key={key} data={product}/>

      )}
    </div>
  )
}
