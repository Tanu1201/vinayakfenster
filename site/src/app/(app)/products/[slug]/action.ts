"use server";

import { prisma } from "@/lib/db";
import { UnwrapPromise } from "@/types/unwrapPromise";

export const getProduct = async (slug: string) => {
  return await prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      productImages: true,
      productCategories: {
        select: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      productBrands: {
        select: {
          brand: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
};

export type GetProductFnDataType = UnwrapPromise<ReturnType<typeof getProduct>>;
