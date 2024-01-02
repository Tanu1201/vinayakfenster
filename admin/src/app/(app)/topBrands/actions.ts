"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const getTopBrands = async () => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized");

  return await prisma.brand.findMany({
    where: {
      isTopBrand: true,
    },
  });
};

export const updateTopBrands = async (brandIds: string[]) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized");

  if (!brandIds.length) throw new Error("No brands provided");

  if (brandIds.length > 5) throw new Error("Only 5 brands can be top brands");

  await Promise.all([
    prisma.brand.updateMany({
      where: {
        isTopBrand: true,
        NOT: {
          id: {
            in: brandIds,
          },
        },
      },
      data: {
        isTopBrand: false,
      },
    }),

    prisma.brand.updateMany({
      where: {
        id: {
          in: brandIds,
        },
      },
      data: {
        isTopBrand: true,
      },
    }),
  ]);

  return true;
};

export const deleteTopBrand = async (brandId: string) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized");

  await prisma.brand.update({
    where: {
      id: brandId,
    },
    data: {
      isTopBrand: false,
    },
  });

  return true;
};
