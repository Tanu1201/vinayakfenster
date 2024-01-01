"use server";

import { revalidatePath } from "next/cache";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { storageClient } from "@/lib/storageClient";
import { UnwrapPromise } from "@/types/UnwrapPromise";

export const getTestimonial = async (id: string) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");

  return await prisma.testimonial.findUnique({
    where: {
      id,
    },
    include: {
      createdBy: true,
      updatedBy: true,
      resource: true,
    },
  });
};

export type GetTestimonialFnDataType = UnwrapPromise<
  ReturnType<typeof getTestimonial>
>;

export const createTestimonial = async ({
  name,
  fileId,
  description,
}: {
  name: string;
  description: string;
  fileId?: string;
}) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");

  const { id } = await prisma.testimonial.create({
    data: {
      name,
      description,
      createdById: session.user.id,
      updatedById: session.user.id,
      resourceId: fileId,
    },
  });

  revalidatePath("/testimonials");
  revalidatePath(`/testimonials/${id}`);

  return id;
};

export const updateTestimonial = async ({
  id,
  name,
  description,
  fileId,
}: {
  id: string;
  name: string;
  description: string;
  fileId?: string;
}) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const testimonial = await prisma.testimonial.findUnique({
    where: {
      id,
    },
    include: {
      resource: true,
    },
  });
  if (!testimonial) throw new Error("Testimonial not found");
  if (fileId) {
    if (testimonial.resource) {
      await Promise.all([
        storageClient.deleteFile(testimonial.resource.newFilename),
        prisma.resource.delete({
          where: {
            id: testimonial.resource.id,
          },
        }),
      ]);
    }
  }
  await prisma.testimonial.update({
    where: {
      id,
    },
    data: {
      name,
      updatedById: session.user.id,
      resourceId: fileId,
      description,
    },
  });

  revalidatePath("/testimonials");
  revalidatePath(`/testimonials/${id}`);
};

export const deleteTestimonial = async (id: string) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.testimonial.delete({
    where: {
      id,
    },
  });

  revalidatePath("/testimonials");
  revalidatePath(`/testimonials/${id}`);
};

export const deleteTestimonialImage = async (id: string) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const testimonial = await prisma.testimonial.findUnique({
    where: {
      id,
    },
    include: {
      resource: true,
    },
  });
  if (!testimonial) throw new Error("Testimonial not found");
  if (!testimonial.resource) throw new Error("Testimonial image not found");

  await prisma.testimonial.update({
    where: {
      id,
    },
    data: {
      resourceId: null,
    },
  });
  await Promise.all([
    storageClient.deleteFile(testimonial.resource.newFilename),
    prisma.resource.delete({
      where: {
        id: testimonial.resource.id,
      },
    }),
  ]);

  revalidatePath("/testimonials");
  revalidatePath(`/testimonials/${id}`);
};
