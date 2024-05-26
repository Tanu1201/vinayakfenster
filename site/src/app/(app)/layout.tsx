import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";
import { NextPage } from "next";
import { ReactNode } from "react";

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="pt-24">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
