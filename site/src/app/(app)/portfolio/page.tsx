import { siteConfig } from '@/lib/siteConfig'
import { Metadata, NextPage } from 'next'
import { Render } from './Render'
import { getPortfolio } from './action'

export const generateMetadata = (): Metadata => ({
  title: 'Portfolio' + ' | ' + siteConfig.name
})

const Portfolio: NextPage = async () => {
  const portfolios = await getPortfolio()

  return <Render portfolios={portfolios} />
}

export default Portfolio
