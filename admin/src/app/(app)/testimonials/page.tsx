import { Testimonial } from "@prisma/client";
import { Metadata } from "next";

import { siteConfig } from "@/lib/siteConfig";
import { getTestimonials } from "./actions";
import { Render } from "./render";

export const metadata: Metadata = {
  title: "Testimonials" + " | " + siteConfig.name,
};

const Testimonials = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    sort?: string;
    name?: string;
  };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10;

  const [sortBy, sortOrder] =
    typeof searchParams.sort === "string"
      ? (searchParams.sort.split(".") as [
          keyof Testimonial | undefined,
          "asc" | "desc" | undefined,
        ])
      : [];

  const name = searchParams.name;

  const data = await getTestimonials({
    page,
    limit,
    sortBy,
    sortOrder,
    name,
  });

  return <Render data={data} />;
};

export default Testimonials;
