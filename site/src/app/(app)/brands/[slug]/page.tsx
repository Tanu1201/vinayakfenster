import { siteConfig } from '@/lib/siteConfig'
// import edjsHTML from 'editorjs-html'
import { Metadata } from 'next/types'
import { getBrand, getBrandProducts } from './actions'
import { Render } from './render'

// const edjsParser = edjsHTML()

export const generateMetadata = async (): Promise<Metadata> => ({
  title: siteConfig.name
})

const BrandPage = async ({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: {
    page?: string
    limit?: string
  }
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10

  const brand = await getBrand(params.slug)
  const products = await getBrandProducts({
    slug: params.slug,
    page,
    limit
  })

  return <Render brand={brand} products={products} />
}

export default BrandPage
