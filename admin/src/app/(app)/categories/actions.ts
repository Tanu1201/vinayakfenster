'use server'

import { Category } from '@prisma/client'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getCategories = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  name
}: {
  page: number
  limit: number
  sortBy?: keyof Category
  sortOrder?: 'asc' | 'desc'
  name?: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const where = {
    name: name ? { contains: name, mode: 'insensitive' as const } : undefined
  }
  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      select: {
        id: true,
        name: true,
        order: true,
        createdAt: true,
        updatedAt: true
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy || 'order']: sortOrder || 'asc'
      }
    }),
    prisma.category.count({
      where
    })
  ])

  return { categories, total }
}

export type GetCategoriesFnDataType = UnwrapPromise<
  ReturnType<typeof getCategories>
>
