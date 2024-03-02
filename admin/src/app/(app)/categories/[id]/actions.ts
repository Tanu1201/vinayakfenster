'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { storageClient } from '@/lib/storageClient'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getCategory = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  return await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      createdBy: true,
      updatedBy: true,
      resource: true
    }
  })
}

export type GetCategoryFnDataType = UnwrapPromise<
  ReturnType<typeof getCategory>
>

export const createCategory = async ({
  name,
  slug,
  fileId,
  description,
  order
}: {
  name: string
  slug: string
  order: number
  fileId?: string
  description?: any
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const { id } = await prisma.category.create({
    data: {
      name,
      slug,
      createdById: session.user.id,
      updatedById: session.user.id,
      resourceId: fileId,
      description,
      order
    }
  })

  revalidatePath('/categories')
  revalidatePath(`/categories/${id}`)

  return id
}

export const updateCategory = async ({
  id,
  name,
  slug,
  fileId,
  description,
  order
}: {
  id: string
  name: string
  slug: string
  order: number
  fileId?: string
  description?: any
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
      updatedById: session.user.id,
      resourceId: fileId,
      description,
      order
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

export const deleteCategoryImage = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')
  const category = await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      resource: true
    }
  })
  if (!category) throw new Error('Category not found')
  if (!category.resource) throw new Error('Category image not found')

  await prisma.category.update({
    where: {
      id
    },
    data: {
      resourceId: null
    }
  })
  await Promise.all([
    storageClient.deleteFile(category.resource.newFilename),
    prisma.resource.delete({
      where: {
        id: category.resource.id
      }
    })
  ])

  revalidatePath('/categories')
  revalidatePath(`/categories/${id}`)
}
