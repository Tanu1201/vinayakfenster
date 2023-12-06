import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
// import logo from "../public/rahi.jpeg";

export const Header: FC = () => {
  return (
    <>
      {/* make a header which have home profile  about contact*/}
      <header className="bg-white  py-4 shadow-lg fixed w-full bg-opacity-80 z-50">
        {/* <div>
          <imag src={logo} alt="LOGO" />
        </div> */}
        <div className="flex justify-between px-16 items-center">
          <Link href={"/"} className="h-16 w-52  relative">
            <Image src="/Header Logo.png" alt="Logo" fill objectFit="contain" />
          </Link>

          <div className="flex gap-16 font-semibold">
            <h1>Home</h1>
            <h1>Profile</h1>
            <h1>About</h1>
            <h1>Contact</h1>
          </div>
        </div>
      </header>
    </>
  );
};
