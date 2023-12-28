import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/siteConfig'
import { getBrands } from '../../brands/actions'
import { getCategories } from '../../categories/actions'
import { GetProductFnDataType, getProduct } from './actions'
import { Render } from './render'

export const generateMetadata = async (props: {
  params: { id: string }
}): Promise<Metadata> => ({
  title: 'Product - ' + props.params.id + ' | ' + siteConfig.name
})

const ProductPage = async ({
  params: { id }
}: {
  params: {
    id: string
  }
}) => {
  let product: GetProductFnDataType | undefined

  if (id !== 'new') {
    const x = await getProduct(id)
    if (!x) return notFound()
    product = x
  }

  const [brands, categories] = await Promise.all([
    getBrands({
      page: 1,
      limit: 100
    }),
    getCategories({
      page: 1,
      limit: 100
    })
  ])

  return (
    <Render
      product={product}
      brands={brands?.brands}
      categories={categories.categories}
    />
  )
}

export default ProductPage
