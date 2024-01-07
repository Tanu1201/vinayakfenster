import { Portfolio } from '@prisma/client'
import { Metadata } from 'next'

import { siteConfig } from '@/lib/siteConfig'
import { getPortfolios } from './actions'
import { Render } from './render'

export const metadata: Metadata = {
  title: 'Portfolios' + ' | ' + siteConfig.name
}

const Portfolios = async ({
  searchParams
}: {
  searchParams: {
    page?: string
    limit?: string
    sort?: string
    name?: string
  }
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10

  const [sortBy, sortOrder] =
    typeof searchParams.sort === 'string'
      ? (searchParams.sort.split('.') as [
          keyof Portfolio | undefined,
          'asc' | 'desc' | undefined
        ])
      : []

  const name = searchParams.name

  const data = await getPortfolios({
    page,
    limit,
    sortBy,
    sortOrder,
    name
  })

  return <Render data={data} />
}

export default Portfolios
