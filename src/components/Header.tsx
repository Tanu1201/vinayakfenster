import { FC } from "react";
// import logo from "../public/rahi.jpeg";

export const Header: FC = () => {
  return (
    <>
      {/* make a header which have home profile  about contact*/}
      <header>
        {/* <div>
          <imag src={logo} alt="LOGO" />
        </div> */}
        <div className="flex flex-column justify-end space-x-10 px-16 text-lg mt-6 text-black ">
          <h1>Home</h1>
          <h1>Profile</h1>
          <h1>About</h1>
          <h1>Contact</h1>
        </div>
      </header>
    </>
  );
};
