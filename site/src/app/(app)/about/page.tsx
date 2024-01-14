import { siteConfig } from '@/lib/siteConfig'
import { Metadata, NextPage } from 'next'
import { Render } from './render'

// export const generateMetadata = (): Metadata => ({
//   title: 'About' + ' | ' + siteConfig.name
// })

export const metadata: Metadata = {
  title: 'About' + ' | ' + siteConfig.name
}

const About: NextPage = () => {
  return <Render />
}

export default About
