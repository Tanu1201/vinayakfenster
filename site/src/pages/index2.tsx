import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="px-20 py-20 grid grid-cols-2 gap-4">
        <div className="">
          <h1 className="text-5xl font-semibold leading-snug">
            Your Premier Destination for Exceptional Fensters, Windows, and
            Aluminium Frames!
          </h1>
          <button className="flex items-center gap-4 py-4 px-8 bg-primary text-white rounded-lg shadow-lg mt-4">
            <span className="text-xl font-light">Explore our Collections</span>
            <FaArrowCircleRight size="26" />
          </button>
        </div>
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/Hero Image.png"
            alt="home-image"
            fill
            objectFit="cover"
          />
        </div>
      </div>

      <div className="py-16">
        <h3 className="text-center text-xl">
          Discover Our Range of Fensters, Windows, and Aluminium Frames
        </h3>
        <div className="flex w-full px-48 mt-6 justify-around">
          <div>
            <div className="relative h-60 w-60  rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/Category/Category 1.png"
                alt="category 1"
                fill
                objectFit="cover"
              />
            </div>
            <div className="text-center">Hi</div>
          </div>
          <div>
            <div className="relative h-60 w-60  rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/Category/Category 2.png"
                alt="category 2"
                fill
                objectFit="cover"
              />
            </div>
            <div className="text-center">Yes</div>
          </div>
          <div>
            <div className="relative h-60 w-60  rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/Category/Category 3.png"
                alt="category 3"
                fill
                objectFit="cover"
              />
            </div>
            <div className="text-center">Here</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-center text-xl">
          Trusted Brands, Unmatched Quality
        </h3>
        <div className="grid grid-cols-4 px-64 gap-y-8 mt-8">
          <div className="flex justify-center w-full">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src="/Hero Image.png" alt="1" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src="/Hero Image.png" alt="2" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src="/Hero Image.png" alt="3" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src="/Hero Image.png" alt="4" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src="/Hero Image.png" alt="5" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src="/Hero Image.png" alt="6" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src="/Hero Image.png" alt="7" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src="/Hero Image.png" alt="8" fill objectFit="cover" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
