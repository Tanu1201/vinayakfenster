import { siteConfig } from "@/lib/siteConfig";
import { Metadata, NextPage } from "next";
import { Render } from "./render";

export const metadata: Metadata = {
  title: "About" + " | " + siteConfig.name,
};

const About: NextPage = () => {
  return <Render />;
};

export default About;
