'use client'

import edjsHTML from 'editorjs-html'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { GetBrandFnDataType, GetBrandProductsFnDataType } from './actions'

const edjsParser = edjsHTML()

export const Render: FC<{
  brand: GetBrandFnDataType
  products: GetBrandProductsFnDataType
}> = ({ brand, products }) => {
  return brand ? (
    <main className="px-4 lg:px-16 gap-8">
      <div className="flex flex-col items-center justify-center mb-10">
        <Image
          alt="Brand Logo"
          className=""
          src={brand.resource?.url || '/placeholder.svg'}
          style={{
            aspectRatio: '150/150',
            objectFit: 'contain'
          }}
          width={200}
          height={200}
        />
        <h1 className="mt-6 text-4xl font-bold">{brand.name}</h1>
        {brand?.description ? (
          <article
            className="prose"
            dangerouslySetInnerHTML={{
              __html: edjsParser.parse(brand?.description as any).join('')
            }}
          />
        ) : null}
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Link href={`/products/${product.slug}`} key={product.id}>
              <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg dark:border-gray-800">
                <Image
                  alt="Product Image"
                  className="rounded-lg object-cover"
                  height={200}
                  src={product.productImages?.[0]?.url || '/placeholder.svg'}
                  style={{
                    aspectRatio: '200/200',
                    objectFit: 'cover'
                  }}
                  width={200}
                />
                <h2 className="mt-4 text-lg font-bold">{product.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </main>
  ) : (
    <Error statusCode={404} withDarkMode={false} />
  )
}
