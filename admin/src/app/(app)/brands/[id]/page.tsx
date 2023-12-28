import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/siteConfig'
import { GetBrandFnDataType, getBrand } from './actions'
import { Render } from './render'

export const generateMetadata = async (props: {
  params: { id: string }
}): Promise<Metadata> => ({
  title: 'Brand - ' + props.params.id + ' | ' + siteConfig.name
})

const BrandPage = async ({
  params: { id }
}: {
  params: {
    id: string
  }
}) => {
  let brand: GetBrandFnDataType | undefined

  if (id !== 'new') {
    const x = await getBrand(id)
    if (!x) return notFound()
    brand = x
  }

  return <Render brand={brand} />
}

export default BrandPage
