'use server'

import { Brand } from '@prisma/client'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getBrands = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  name
}: {
  page: number
  limit: number
  sortBy?: keyof Brand
  sortOrder?: 'asc' | 'desc'
  name?: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const where = {
    name: name ? { contains: name, mode: 'insensitive' as const } : undefined
  }
  const [brands, total] = await Promise.all([
    prisma.brand.findMany({
      where,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy || 'createdAt']: sortOrder || 'desc'
      }
    }),
    prisma.brand.count({
      where
    })
  ])

  return { brands, total }
}

export type GetBrandsFnDataType = UnwrapPromise<ReturnType<typeof getBrands>>
