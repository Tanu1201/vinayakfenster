'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getCategory = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  return await prisma.category.findUnique({
    where: {
      id
    }
  })
}

export type GetCategoryFnDataType = UnwrapPromise<
  ReturnType<typeof getCategory>
>

export const createCategory = async ({
  name,
  slug
}: {
  name: string
  slug: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const { id } = await prisma.category.create({
    data: {
      name,
      slug,
      createdById: 'clqmj2ipf0000149szh0zm32l',
      updatedById: 'clqmj2ipf0000149szh0zm32l'
    }
  })

  revalidatePath('/categories')
  revalidatePath(`/categories/${id}`)

  return id
}

export const updateCategory = async ({
  id,
  name,
  slug
}: {
  id: string
  name: string
  slug: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  await prisma.category.update({
    where: {
      id
    },
    data: {
      name,
      slug,
      updatedById: 'clqmj2ipf0000149szh0zm32l'
    }
  })

  revalidatePath('/categories')
  revalidatePath(`/categories/${id}`)
}

export const deleteCategory = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  await prisma.category.delete({
    where: {
      id
    }
  })

  revalidatePath('/categories')
  revalidatePath(`/categories/${id}`)
}
