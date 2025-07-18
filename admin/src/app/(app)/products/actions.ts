"use server";

import { Product } from "@prisma/client";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { UnwrapPromise } from "@/types/UnwrapPromise";

export const getProducts = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  name,
}: {
  page: number;
  limit: number;
  sortBy?: keyof Product;
  sortOrder?: "asc" | "desc";
  name?: string;
}) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");

  const where = {
    name: name ? { contains: name, mode: "insensitive" as const } : undefined,
  };
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        productBrands: {
          select: {
            id: true,
            brand: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        productCategories: {
          select: {
            id: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        productImages: {
          take: 1,
          select: {
            id: true,
            url: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy || "updatedAt"]: sortOrder || "desc",
      },
    }),
    prisma.product.count({
      where,
    }),
  ]);

  return { products, total };
};

export type GetProductsFnDataType = UnwrapPromise<
  ReturnType<typeof getProducts>
>;
