'use server'

import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/unwrapPromise'

export const getCategory = async (slug: string) => {
  return await prisma.category.findUnique({
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

export type GetCategoryFnDataType = UnwrapPromise<
  ReturnType<typeof getCategory>
>

export const getCategoryProducts = async ({
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
      category: {
        slug
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

export type GetCategoryProductsFnDataType = UnwrapPromise<
  ReturnType<typeof getCategoryProducts>
>
