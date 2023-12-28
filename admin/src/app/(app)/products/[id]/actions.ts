'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getProduct = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  return await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      createdBy: true,
      updatedBy: true,
      brand: true,
      category: true
    }
  })
}

export type GetProductFnDataType = UnwrapPromise<ReturnType<typeof getProduct>>

export const createProduct = async ({
  name,
  slug,
  description,
  brandId,
  categoryId
}: {
  name: string
  slug: string
  description: string
  brandId?: string
  categoryId?: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const { id } = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      brandId,
      categoryId,
      createdById: session.user.id,
      updatedById: session.user.id
    }
  })

  revalidatePath('/products')
  revalidatePath(`/products/${id}`)

  return id
}

export const updateProduct = async ({
  id,
  name,
  slug,
  description,
  brandId,
  categoryId
}: {
  id: string
  name: string
  slug: string
  description: string
  brandId?: string
  categoryId?: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  await prisma.product.update({
    where: {
      id
    },
    data: {
      name,
      slug,
      description,
      brandId,
      categoryId,
      updatedById: session.user.id
    }
  })

  revalidatePath('/products')
  revalidatePath(`/products/${id}`)
}

export const deleteProduct = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  await prisma.product.delete({
    where: {
      id
    }
  })

  revalidatePath('/products')
  revalidatePath(`/products/${id}`)
}
