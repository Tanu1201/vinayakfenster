import Image from "next/image";
import React from "react";
import "animate.css";
import { IoIosArrowDropright } from "react-icons/io";

const HomePageBanner = () => {
  return (
    <div className="w-full mx-auto my-10 md:my-20 h-auto md:h-[40vh]">
      <div className="flex flex-col md:flex-row justify-center items-center h-full gap-8 md:gap-0">
        <div className="w-full md:w-1/2 px-5   order-2 md:order-1">
          <h1 className="text-2xl md:text-[35px]  font-bold tracking-wide  md:mb-5 ">
            Your Premier Destination for Exceptional Fensters, Windows, and
            Aluminium Frames!
          </h1>
          <button className="p-3 hover:animate__animated hover:animate__pulse flex flex-row justify-center items-center gap-2 rounded-xl shadow-xl text-white font-normal bg-[#4E7DA9] px-5">
            Explore Our Collections <IoIosArrowDropright size={20} />
          </button>
        </div>
        <div className="w-full md:w-1/2 h-full flex items-center justify-center rounded-xl">
                   {" "}
          <Image
            className="z-20 w-[85%] h-[90%] rounded-xl shadow-xl"
            width={1000}
            height={1000}
            src="/hero.png"
            alt="Beautiful room with fensters, windows, and curtains"
          />
                 {" "}
        </div>
      </div>
    </div>
  );
};

export default HomePageBanner;
