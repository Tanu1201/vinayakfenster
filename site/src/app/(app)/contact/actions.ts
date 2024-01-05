'use server'

import { prisma } from '@/lib/db'

export const sendEnquiry = async ({
  name,
  email,
  phone,
  company,
  message
}: {
  name: string
  email: string
  phone: string
  company?: string
  message: string
}) => {
  await prisma.enquiry.create({
    data: {
      name,
      email,
      phone,
      companyName: company,
      message
    }
  })
}
