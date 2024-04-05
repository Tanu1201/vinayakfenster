import { Metadata } from "next";
import { getProduct } from "./action";
import { Render } from "./render";
import { siteConfig } from "@/lib/siteConfig";

export const generateMetadata = (props: {
  params: { slug: string };
}): Metadata => ({
  title: props.params.slug + " | " + siteConfig.name,
});

const Product = async ({ params }: { params: { slug: string } }) => {
  const product = await getProduct(params.slug);

  return <Render product={product} />;
};

export default Product;
