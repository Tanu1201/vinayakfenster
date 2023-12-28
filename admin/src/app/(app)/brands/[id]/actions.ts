'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getBrand = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  return await prisma.brand.findUnique({
    where: {
      id
    },
    include: {
      createdBy: true,
      updatedBy: true
    }
  })
}

export type GetBrandFnDataType = UnwrapPromise<ReturnType<typeof getBrand>>

export const createBrand = async ({
  name,
  slug
}: {
  name: string
  slug: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const { id } = await prisma.brand.create({
    data: {
      name,
      slug,
      createdById: session.user.id,
      updatedById: session.user.id
    }
  })

  revalidatePath('/brands')
  revalidatePath(`/brands/${id}`)

  return id
}

export const updateBrand = async ({
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

  await prisma.brand.update({
    where: {
      id
    },
    data: {
      name,
      slug,
      updatedById: session.user.id
    }
  })

  revalidatePath('/brands')
  revalidatePath(`/brands/${id}`)
}

export const deleteBrand = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  await prisma.brand.delete({
    where: {
      id
    }
  })

  revalidatePath('/brands')
  revalidatePath(`/brands/${id}`)
}
