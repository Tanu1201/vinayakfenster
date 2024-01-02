'use server'

import { prisma } from '@/lib/db'

export const getBrands = async () => {
  return await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      resource: {
        select: {
          id: true,
          url: true
        }
      }
    }
  })
}
