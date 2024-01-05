'use client'

import edjsHTML from 'editorjs-html'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { GetProductFnDataType } from './action'

const edjsParser = edjsHTML()

export const Render: FC<{ product: GetProductFnDataType }> = ({ product }) => {
  const [image, setImage] = useState(product?.productImages?.[0]?.url)

  return product ? (
    <div>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid md:grid-cols-5 gap-3 items-start">
          {(product?.productImages.length || 0) > 1 ? (
            <div className="hidden md:flex flex-col gap-3 items-start">
              {product?.productImages.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setImage(img.url)}
                  className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
                >
                  <Image
                    alt={'Product Image ' + i}
                    src={img.url}
                    width={600}
                    height={900}
                  />
                  <span className="sr-only">View Image 1</span>
                </button>
              ))}
            </div>
          ) : null}
          <div className="md:col-span-4">
            <Image
              alt={'Product Image'}
              src={image || '/placeholder.svg'}
              width={600}
              height={900}
            />
          </div>
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{product?.name}</h1>
            <div>
              {product?.category ? (
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="text-lg text-gray-500 block"
                >
                  {product.category.name}
                </Link>
              ) : null}
              {product?.brand ? (
                <Link
                  href={`/brands/${product.brand.slug}`}
                  className="text-xl font-semibold text-gray-500 block"
                >
                  {product.brand.name}
                </Link>
              ) : null}
            </div>
            <div>
              {product.description ? (
                <article
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: edjsParser
                      .parse(product?.description as any)
                      .join('')
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <Error statusCode={404} withDarkMode={false} />
  )
}
