'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { storageClient } from '@/lib/storageClient'
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
      updatedBy: true,
      resource: true
    }
  })
}

export type GetBrandFnDataType = UnwrapPromise<ReturnType<typeof getBrand>>

export const createBrand = async ({
  name,
  slug,
  fileId
}: {
  name: string
  slug: string
  fileId?: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  const { id } = await prisma.brand.create({
    data: {
      name,
      slug,
      createdById: session.user.id,
      updatedById: session.user.id,
      resourceId: fileId
    }
  })

  revalidatePath('/brands')
  revalidatePath(`/brands/${id}`)

  return id
}

export const updateBrand = async ({
  id,
  name,
  slug,
  fileId
}: {
  id: string
  name: string
  slug: string
  fileId?: string
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')
  const brand = await prisma.brand.findUnique({
    where: {
      id
    },
    include: {
      resource: true
    }
  })
  if (!brand) throw new Error('Brand not found')
  if (fileId) {
    if (brand.resource) {
      await Promise.all([
        storageClient.deleteFile(brand.resource.newFilename),
        prisma.resource.delete({
          where: {
            id: brand.resource.id
          }
        })
      ])
    }
  }
  await prisma.brand.update({
    where: {
      id
    },
    data: {
      name,
      slug,
      updatedById: session.user.id,
      resourceId: fileId
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

export const deleteBrandImage = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')
  const brand = await prisma.brand.findUnique({
    where: {
      id
    },
    include: {
      resource: true
    }
  })
  if (!brand) throw new Error('Brand not found')
  if (!brand.resource) throw new Error('Brand image not found')

  await prisma.brand.update({
    where: {
      id
    },
    data: {
      resourceId: null
    }
  })
  await Promise.all([
    storageClient.deleteFile(brand.resource.newFilename),
    prisma.resource.delete({
      where: {
        id: brand.resource.id
      }
    })
  ])

  revalidatePath('/brands')
  revalidatePath(`/brands/${id}`)
}
