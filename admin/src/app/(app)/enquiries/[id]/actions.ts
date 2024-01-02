import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnwrapPromise } from '@/types/UnwrapPromise'

export const getEnquiry = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  return await prisma.enquiry.findUnique({
    where: {
      id
    }
  })
}

export type GetEnquiryFnDataType = UnwrapPromise<ReturnType<typeof getEnquiry>>

export const deleteEnquiry = async (id: string) => {
  const session = await getAuthSession()
  if (!session) throw new Error('Unauthorized')

  await prisma.enquiry.delete({
    where: {
      id
    }
  })
}
