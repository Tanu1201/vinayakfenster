'use server'

import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/unwrapPromise'

export const getProduct = async (slug: string) => {
  return await prisma.product.findFirst({
    where: {
      slug
    },
    include: {
      productImages: true,
      brand: true,
      category: true
    }
  })
}

export type GetProductFnDataType = UnwrapPromise<ReturnType<typeof getProduct>>
