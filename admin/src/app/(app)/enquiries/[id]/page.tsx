import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/siteConfig'
import { GetEnquiryFnDataType, getEnquiry } from './actions'
import { Render } from './render'

export const generateMetadata = async (props: {
  params: { id: string }
}): Promise<Metadata> => ({
  title: 'Enquiry - ' + props.params.id + ' | ' + siteConfig.name
})

const EnquiryPage = async ({
  params: { id }
}: {
  params: {
    id: string
  }
}) => {
  let enquiry: GetEnquiryFnDataType | undefined

  if (id !== 'new') {
    const x = await getEnquiry(id)
    if (!x) return notFound()
    enquiry = x
  }

  return <Render enquiry={enquiry} />
}

export default EnquiryPage
