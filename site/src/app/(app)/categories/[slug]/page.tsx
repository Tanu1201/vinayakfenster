import { siteConfig } from "@/lib/siteConfig";
import { Metadata } from "next/types";
import { getCategory, getCategoryProducts } from "./actions";
import { Render } from "./render";

export const generateMetadata = async (props: {
  params: { slug: string };
}): Promise<Metadata> => {
  const category = await getCategory(props.params.slug);
  return {
    title: category?.name + " | " + siteConfig.name,
  };
};

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    page?: string;
    limit?: string;
  };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10;

  const category = await getCategory(params.slug);
  const products = await getCategoryProducts({
    slug: params.slug,
    page,
    limit,
  });

  return <Render category={category} products={products} />;
};

export default CategoryPage;
