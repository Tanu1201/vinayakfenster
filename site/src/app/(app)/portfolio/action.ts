import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/unwrapPromise'

export const getPortfolio = async () => {
  return await prisma.portfolio.findMany({
    orderBy: {
      name: 'asc'
    },
    include: {
      portfolioImages: true
    }
  })
}

export type GetPortfolioFnDatatype = UnwrapPromise<
  ReturnType<typeof getPortfolio>
>
