import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/siteConfig'
import { GetPortfolioFnDataType, getPortfolio } from './actions'
import { Render } from './render'

export const generateMetadata = async (props: {
  params: { id: string }
}): Promise<Metadata> => ({
  title: 'Portfolio - ' + props.params.id + ' | ' + siteConfig.name
})

const PortfolioPage = async ({
  params: { id }
}: {
  params: {
    id: string
  }
}) => {
  let portfolio: GetPortfolioFnDataType | undefined

  if (id !== 'new') {
    const x = await getPortfolio(id)
    if (!x) return notFound()
    portfolio = x
  }

  return <Render portfolio={portfolio} />
}

export default PortfolioPage
