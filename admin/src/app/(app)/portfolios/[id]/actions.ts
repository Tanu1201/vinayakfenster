'use server'

import { revalidatePath } from 'next/cache'

import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { storageClient } from '@/lib/storageClient'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getPortfolio = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  return await prisma.portfolio.findUnique({
    where: {
      id
    },
    include: {
      createdBy: true,
      updatedBy: true,
      portfolioImages: true
    }
  })
}

export type GetPortfolioFnDataType = UnwrapPromise<
  ReturnType<typeof getPortfolio>
>

export const createPortfolio = async ({
  name,
  description,
  fileIds
}: {
  name: string
  description: any
  fileIds?: string[]
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')
  const { id } = await prisma.portfolio.create({
    data: {
      name,
      description,
      createdById: session.user.id,
      updatedById: session.user.id
    }
  })

  if (fileIds?.length)
    await prisma.resource.updateMany({
      where: {
        id: {
          in: fileIds
        }
      },
      data: {
        portfolioId: id
      }
    })

  revalidatePath('/portfolios')
  revalidatePath(`/portfolios/${id}`)

  return id
}

export const updatePortfolio = async ({
  id,
  name,
  description,
  fileIds
}: {
  id: string
  name: string
  description: any
  fileIds?: string[]
}) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')
  await prisma.portfolio.update({
    where: {
      id
    },
    data: {
      name,
      description,
      updatedById: session.user.id
    }
  })

  if (fileIds?.length)
    await prisma.resource.updateMany({
      where: {
        id: {
          in: fileIds
        }
      },
      data: {
        portfolioId: id
      }
    })

  revalidatePath('/portfolios')
  revalidatePath(`/portfolios/${id}`)
}

export const deletePortfolio = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  await prisma.resource.deleteMany({
    where: {
      portfolioId: id
    }
  })

  await prisma.portfolio.delete({
    where: {
      id
    }
  })

  revalidatePath('/portfolios')
  revalidatePath(`/portfolios/${id}`)
}

export const deletePortfolioImage = async (portfolioImageId: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')
  const portfolioImage = await prisma.resource.findUnique({
    where: {
      id: portfolioImageId
    },
    include: {
      product: true
    }
  })
  if (!portfolioImage) throw new Error('Product image not found')
  await Promise.all([
    storageClient.deleteFile(portfolioImage.newFilename),
    prisma.resource.delete({
      where: {
        id: portfolioImageId
      }
    })
  ])

  revalidatePath('/portfolios')
  revalidatePath(`/portfolios/${portfolioImageId}`)
}
