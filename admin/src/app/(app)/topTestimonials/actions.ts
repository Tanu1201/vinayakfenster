"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const getTopTestimonials = async () => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized");

  return await prisma.testimonial.findMany({
    where: {
      isTopTestimonial: true,
    },
  });
};

export const updateTopTestimonials = async (testimonialIds: string[]) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized");

  if (!testimonialIds.length) throw new Error("No testimonials provided");

  if (testimonialIds.length > 3)
    throw new Error("Only 3 testimonials can be top testimonials");

  await Promise.all([
    prisma.testimonial.updateMany({
      where: {
        isTopTestimonial: true,
        NOT: {
          id: {
            in: testimonialIds,
          },
        },
      },
      data: {
        isTopTestimonial: false,
      },
    }),

    prisma.testimonial.updateMany({
      where: {
        id: {
          in: testimonialIds,
        },
      },
      data: {
        isTopTestimonial: true,
      },
    }),
  ]);

  return true;
};

export const deleteTopTestimonial = async (testimonialId: string) => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized");

  await prisma.testimonial.update({
    where: {
      id: testimonialId,
    },
    data: {
      isTopTestimonial: false,
    },
  });

  return true;
};
