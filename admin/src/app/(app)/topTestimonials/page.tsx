import { siteConfig } from "@/lib/siteConfig";
import { Metadata, NextPage } from "next";
import { getTestimonials } from "../testimonials/actions";
import { getTopTestimonials } from "./actions";
import { Render } from "./render";

export const metadata: Metadata = {
  title: "Top Testimonials" + " | " + siteConfig.name,
};

const TopTestimonials: NextPage = async () => {
  const topTestimonials = await getTopTestimonials();
  const testmonials = await getTestimonials({ page: 1, limit: 100 });

  return (
    <Render data={topTestimonials} allTestimonials={testmonials.testimonials} />
  );
};

export default TopTestimonials;
