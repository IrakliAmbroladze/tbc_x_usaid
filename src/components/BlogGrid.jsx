import { blogs } from './Blog_data'
import ProductCart from './productCart'

export function BlogGrid() {

  return (
    <div className='item_grid'>
      {blogs.map((product, key) =>
        <ProductCart key={key} data={product}/>

      )}
    </div>
  )
}
