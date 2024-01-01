"use server";

import { Testimonial } from "@prisma/client";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { UnwrapPromise } from "@/types/UnwrapPromise";

export const getTestimonials = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  name,
}: {
  page: number;
  limit: number;
  sortBy?: keyof Testimonial;
  sortOrder?: "asc" | "desc";
  name?: string;
}) => {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");

  const where = {
    name: name ? { contains: name, mode: "insensitive" as const } : undefined,
  };
  const [testimonials, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy || "createdAt"]: sortOrder || "desc",
      },
    }),
    prisma.testimonial.count({
      where,
    }),
  ]);

  return { testimonials, total };
};

export type GetTestimonialsFnDataType = UnwrapPromise<
  ReturnType<typeof getTestimonials>
>;
