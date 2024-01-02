'use server'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/UnwrapPromise'
import { Enquiry } from '@prisma/client'

export const getEnquiries = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  name
}: {
  page: number
  limit: number
  sortBy?: keyof Enquiry
  sortOrder?: 'asc' | 'desc'
  name?: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const where = name
    ? {
        OR: [
          { name: { contains: name, mode: 'insensitive' as const } },
          { email: { contains: name, mode: 'insensitive' as const } },
          { phone: { contains: name, mode: 'insensitive' as const } }
        ]
      }
    : undefined
  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy || 'createdAt']: sortOrder || 'desc'
      }
    }),
    prisma.enquiry.count({
      where
    })
  ])

  return { enquiries, total }
}

export type GetEnquiriesFnDataType = UnwrapPromise<
  ReturnType<typeof getEnquiries>
>
