import { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/lib/siteConfig";
import { GetTestimonialFnDataType, getTestimonial } from "./actions";
import { Render } from "./render";

export const generateMetadata = async (props: {
  params: { id: string };
}): Promise<Metadata> => ({
  title: "Testimonial - " + props.params.id + " | " + siteConfig.name,
});

const TestimonialPage = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  let testimonial: GetTestimonialFnDataType | undefined;

  if (id !== "new") {
    const x = await getTestimonial(id);
    if (!x) return notFound();
    testimonial = x;
  }

  return <Render testimonial={testimonial} />;
};

export default TestimonialPage;
