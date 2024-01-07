'use server'

import { Portfolio } from '@prisma/client'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getPortfolios = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  name
}: {
  page: number
  limit: number
  sortBy?: keyof Portfolio
  sortOrder?: 'asc' | 'desc'
  name?: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const where = {
    name: name ? { contains: name, mode: 'insensitive' as const } : undefined
  }
  const [portfolios, total] = await Promise.all([
    prisma.portfolio.findMany({
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
    prisma.portfolio.count({
      where
    })
  ])

  return { portfolios, total }
}

export type GetPortfoliosFnDataType = UnwrapPromise<
  ReturnType<typeof getPortfolios>
>
