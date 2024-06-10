import { Metadata } from "next";
import { getProduct } from "./action";
import { Render } from "./render";

export const generateMetadata = async (props: {
  params: { slug: string };
}): Promise<Metadata> => {
  const product = await getProduct(props.params.slug);
  return { title: product?.metaTitle, description: product?.metaDescription };
};

const Product = async ({ params }: { params: { slug: string } }) => {
  const product = await getProduct(params.slug);

  return <Render product={product} />;
};

export default Product;
