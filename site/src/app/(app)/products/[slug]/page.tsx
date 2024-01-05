import { getProduct } from './action'
import { Render } from './render'

const Product = async ({ params }: { params: { slug: string } }) => {
  const product = await getProduct(params.slug)

  return <Render product={product} />
}

export default Product
