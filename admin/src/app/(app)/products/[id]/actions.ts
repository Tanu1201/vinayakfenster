"use server";

import { revalidatePath } from "next/cache";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { storageClient } from "@/lib/storageClient";
import { UnwrapPromise } from "@/types/UnwrapPromise";

export const getProduct = async (id: string) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");

  return await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      createdBy: true,
      updatedBy: true,
      productBrands: {
        select: {
          brand: true,
        },
      },
      productCategories: {
        select: {
          category: true,
        },
      },
      productImages: true,
    },
  });
};

export type GetProductFnDataType = UnwrapPromise<ReturnType<typeof getProduct>>;

export const createProduct = async ({
  name,
  slug,
  description,
  brandIds,
  categoryIds,
  fileIds,
}: {
  name: string;
  slug: string;
  description: any;
  brandIds: string[];
  categoryIds: string[];
  fileIds?: string[];
}) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const { id } = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      createdById: session.user.id,
      updatedById: session.user.id,
      productBrands: {
        create: brandIds.map((brandId) => ({
          brandId,
        })),
      },
      productCategories: {
        create: categoryIds.map((categoryId) => ({
          categoryId,
        })),
      },
    },
  });

  if (fileIds?.length)
    await prisma.resource.updateMany({
      where: {
        id: {
          in: fileIds,
        },
      },
      data: {
        productId: id,
      },
    });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);

  return id;
};

export const updateProduct = async ({
  id,
  name,
  slug,
  description,
  brandIds,
  categoryIds,
  fileIds,
}: {
  id: string;
  name: string;
  slug: string;
  description: any;
  brandIds: string[];
  categoryIds: string[];
  fileIds?: string[];
}) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      description,
      updatedById: session.user.id,
      productBrands: {
        deleteMany: {},
        create: brandIds.map((brandId) => ({
          brandId,
        })),
      },
      productCategories: {
        deleteMany: {},
        create: categoryIds.map((categoryId) => ({
          categoryId,
        })),
      },
    },
  });

  if (fileIds?.length)
    await prisma.resource.updateMany({
      where: {
        id: {
          in: fileIds,
        },
      },
      data: {
        productId: id,
      },
    });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
};

export const deleteProduct = async (id: string) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");

  await Promise.all([
    prisma.resource.deleteMany({
      where: {
        productId: id,
      },
    }),
    prisma.productBrand.deleteMany({
      where: {
        productId: id,
      },
    }),
    prisma.productCategory.deleteMany({
      where: {
        productId: id,
      },
    }),
  ]);

  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
};

export const deleteProductImage = async (productImageId: string) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const productImage = await prisma.resource.findUnique({
    where: {
      id: productImageId,
    },
    include: {
      product: true,
    },
  });
  if (!productImage) throw new Error("Product image not found");
  await Promise.all([
    storageClient.deleteFile(productImage.newFilename),
    prisma.resource.delete({
      where: {
        id: productImageId,
      },
    }),
  ]);

  revalidatePath("/products");
  revalidatePath(`/products/${productImageId}`);
};
