import Image from 'next/image'
import Link from 'next/link'
import { getBrand, getBrandProducts } from './actions'

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

  if (!brand) {
    return 'Brand not found!'
  }

  return (
    <>
      <h1>{brand.name}</h1>
      <p>{brand.description}</p>
      {products.map(product => (
        <Link href={`/products/${product.slug}`} key={product.id}>
          {product.productImages?.[0] ? (
            <div>
              <Image
                src={product.productImages[0].url}
                alt={product.name}
                width={300}
                height={300}
              />
            </div>
          ) : null}
          <p>{product.name}</p>
        </Link>
      ))}
    </>
  )
}

export default BrandPage
