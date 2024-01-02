import { siteConfig } from "@/lib/siteConfig";
import { Metadata, NextPage } from "next";
import { getBrands } from "../brands/actions";
import { getTopBrands } from "./actions";
import { Render } from "./render";

export const metadata: Metadata = {
  title: "Top Brands" + " | " + siteConfig.name,
};

const TopBrands: NextPage = async () => {
  const topBrands = await getTopBrands();
  const brands = await getBrands({ page: 1, limit: 100 });

  return <Render data={topBrands} allBrands={brands.brands} />;
};

export default TopBrands;
