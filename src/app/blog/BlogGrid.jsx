import { blogs } from './Blog_data'
import BlogCart from './BlogCart'

export function BlogGrid() {

  return (
    <div className="container margin-top-20px">

    <div className='item_grid'>
      {blogs.map((product, key) =>
        <BlogCart key={key} data={product}/>
        
      )}
    </div>
      </div>
  )
}
