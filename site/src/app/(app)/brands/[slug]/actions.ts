'use server'

import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/unwrapPromise'

export const getBrand = async (slug: string) => {
  return await prisma.brand.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      resource: {
        select: {
          id: true,
          url: true
        }
      }
    }
  })
}

export type GetBrandFnDataType = UnwrapPromise<ReturnType<typeof getBrand>>

export const getBrandProducts = async ({
  slug,
  page,
  limit
}: {
  slug: string
  page: number
  limit: number
}) => {
  return await prisma.product.findMany({
    where: {
      productBrands: {
        some: {
          brand: {
            slug
          }
        }
      }
    },
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      name: true,
      slug: true,
      productImages: {
        select: {
          url: true
        }
      }
    }
  })
}

export type GetBrandProductsFnDataType = UnwrapPromise<
  ReturnType<typeof getBrandProducts>
>
