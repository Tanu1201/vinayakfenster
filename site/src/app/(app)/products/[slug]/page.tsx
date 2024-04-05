import { Metadata } from "next";
import { getProduct } from "./action";
import { Render } from "./render";
import { siteConfig } from "@/lib/siteConfig";

export const generateMetadata = async (props: {
  params: { slug: string };
}): Promise<Metadata> => {
  const product = await getProduct(props.params.slug);
  return { title: product?.name + " | " + siteConfig.name };
};

const Product = async ({ params }: { params: { slug: string } }) => {
  const product = await getProduct(params.slug);

  return <Render product={product} />;
};

export default Product;
