"use server"

import { prisma } from "@/lib/db"

export const getTopBrands = async () => {
  return await prisma.brand.findMany({
    where: {
      isTopBrand: true,
    },
    include: {
      resource: true,
    },
  })
}

export const getTopTestimonials = async () => {
  return await prisma.testimonial.findMany({
    where: {
      isTopTestimonial: true,
    },
    include: {
      resource: true,
    },
  })
}

export const getCategories = async () => {
  return await prisma.category.findMany({
    include: {
      resource: true,
    },
    orderBy: {
      order: "asc",
    },
    take: 5,
  })
}
