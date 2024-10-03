import { products } from './Item_data'
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
