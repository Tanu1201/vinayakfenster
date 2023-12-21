import { NextPage } from 'next'
import Image from 'next/image'

const Brands: NextPage = () => {
  return (
    <>
      <div className="relative w-full h-[50dvh]">
        <Image
          layout="fill"
          objectFit="cover"
          // height={1}
          // width={1}
          src="/Brands/hero.png"
          alt="Brands"
        />
        <h1 className="text-white absolute text-5xl right-24 tracking-wide leading-normal text-right font-bold w-1/4 top-1/2 -translate-y-1/2">
          Discover Our Trusted Brands
        </h1>
      </div>

      <h2 className="font-semibold text-3xl text-center mt-16">
        Explore Our Featured Brands
      </h2>

      <p className="text-center mt-4 px-4 lg:px-16">
        At Vinayak Fensters, we believe in the power of partnerships. Our
        commitment to excellence is reflected in our curated selection of
        trusted brands, each chosen with precision to deliver unparalleled
        quality, innovation, and style. Explore the world of premium fensters,
        windows, and aluminium frames through the lens of our esteemed brand
        collaborations.
      </p>

      <div className="grid grid-cols-4  gap-32 mt-16 px-4 lg:px-32">
        <div className="flex w-full h-32 relative">
          <Image
            src="/Brands/brand1.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex w-full h-32 relative">
          <Image
            src="/Brands/brand2.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex w-full h-32 relative">
          <Image
            src="/Brands/brand3.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex w-full h-32 relative">
          <Image
            src="/Brands/brand4.png"
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
        <div className="flex w-full h-32 relative">
          <Image
            src="/Brands/brand5.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex w-full h-32 relative">
          <Image
            src="/Brands/brand6.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex w-full h-32 relative">
          <Image
            src="/Brands/brand7.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex w-full h-32 relative">
          <Image
            src="/Brands/brand8.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </>
  )
}

export default Brands
