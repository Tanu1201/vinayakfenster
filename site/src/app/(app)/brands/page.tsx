import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBrands } from './actions'

const Brands: NextPage = async () => {
  const brands = await getBrands()
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
        <h1 className="text-white absolute text-3xl sm:text-5xl right-5 md:right-24 tracking-wide leading-normal text-right font-bold w-1/2 md:w-1/4 top-1/2 -translate-y-1/2">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-32 mt-16 px-4 lg:px-32">
        {brands.map(brand => (
          <Link
            href={`/brands/${brand.slug}`}
            key={brand.id}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex w-full h-32 relative" key={brand.id}>
              {brand.resource ? (
                <Image
                  src={brand.resource?.url}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              ) : null}
            </div>
            <div>{brand.name}</div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Brands
