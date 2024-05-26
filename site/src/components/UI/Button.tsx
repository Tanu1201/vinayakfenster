import { FC, ReactNode } from "react";

export const Button: FC<{
  children: ReactNode;
  white?: boolean;
}> = ({ children, white }) => {
  return (
    <div
      className={`p-2 cursor-pointer px-4 inline-block border-2   hover:bg-black hover:text-white  hover:shadow-lg ${
        white
          ? "border-white hover:bg-white hover:text-black"
          : "border-[#030303] hover:bg-black hover:text-white"
      } transition duration-300 ease-in-out`}
    >
      {children}
    </div>
  );
};
