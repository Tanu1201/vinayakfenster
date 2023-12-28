import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/siteConfig'
import { GetCategoryFnDataType, getCategory } from './actions'
import { Render } from './render'

export const generateMetadata = async (props: {
  params: { id: string }
}): Promise<Metadata> => ({
  title: 'Category - ' + props.params.id + ' | ' + siteConfig.name
})

const CategoryPage = async ({
  params: { id }
}: {
  params: {
    id: string
  }
}) => {
  let category: GetCategoryFnDataType | undefined

  if (id !== 'new') {
    const x = await getCategory(id)
    if (!x) return notFound()
    category = x
  }

  return <Render category={category} />
}

export default CategoryPage
