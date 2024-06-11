import { Button } from "@/components/UI/Button";
import { siteConfig } from "@/lib/siteConfig";
import { Metadata, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import { getCategories, getTopBrands, getTopTestimonials } from "./actions";
import "swiper/css";
import HomePageBannner from "@/components/HomePageBannner";
import { HomeBanner } from "@/components/HomeBanner";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: siteConfig.name,
});

const images = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/mynewproject-92da4.appspot.com/o/pexels-blitzboy-950054.jpg?alt=media&token=5fe1e288-03f2-4264-88cd-5582ec45bf55",
    heading: "Discover Innovative Window Designs",
    text: "Explore our range of modern and efficient window solutions tailored to your needs.",
    buttonText: "Learn More",
    buttonLink: "/portfolio",
  },
  {
    url: "/Home/banner/3.jpg",
    heading: "Transform Your Space with Style",
    text: "Find the perfect window solutions to elevate the aesthetics of your project.",
    buttonText: "Learn More",
    buttonLink: "/portfolio",
  },
  {
    url: "/Home/banner/4.jpg",
    heading: "Quality Windows for Every Project",
    text: "Our solutions ensure both beauty and functionality for any building.",
    buttonText: "Learn More",
    buttonLink: "/portfolio",
  },
  {
    url: "/Home/banner/2.jpg",
    heading: "Unmatched Elegance and Performance",
    text: "Choose from our premium selection of windows to enhance your space.",
    buttonText: "Learn More",
    buttonLink: "/portfolio",
  },
];

const Home: NextPage = async () => {
  const [topBrands, categories, testimonials] = await Promise.all([
    getTopBrands(),
    getCategories(),
    getTopTestimonials(),
  ]);

  return (
    <>
      <div className=" md:items-center gap-8 mb-20 md:flex-row">
        <HomeBanner />
      </div>
      {/* <div className="rounded-full bg-[#4E7DA9] h-[500px] w-[500px]   absolute -left-24 -top-56"></div>
      <div className="rounded-full bg-[#299BB1] h-[400px] w-[400px] top-[45%] -z-20  flex items-center justify-center absolute -right-52 ">
        <div className="rounded-full bg-white h-[220px] w-[220px] "></div>
      </div> */}

      <div>
        <div className="text-center font-semibold text-2xl mb-20">
          Discover Our Range of Fensters, Windows, and Aluminium Frames{" "}
        </div>
        <div className="flex justify-evenly my-10 flex-wrap gap-5  ">
          {images.map((img, i) => {
            return (
              <div className="flex flex-col gap-3" key={i}>
                <Image
                  src={img.url}
                  alt={img.text}
                  className="h-[250px] w-[350px] cursor-pointer rounded-xl shadow-xl hover:scale-105 transition-all duration-500 ease-in-out"
                  width={1000}
                  height={1000}
                />
                <h1 className="text-center font-semibold ">{img.heading}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full my-48 h-48 bg-cover relative bgimage">
        <h1 className="text-white text-lg  md:text-2xl lg:text-4xl font-semibold text-center w-[60%]">
          Elevate your space with bespoke Fensters, Windows, and Aluminium
          Frames - where elegance meets functionality seamlessly.{" "}
        </h1>
      </div>
      <HomePageBannner />

      <div className="mt-16">
        <h2 className="font-semibold text-3xl text-center mt-8">
          Our Premium Brands
        </h2>

        <div className="grid grid-cols-2 px-8 sm:px-16 xl:px-32 items-center md:flex mt-8 justify-center gap-16">
          {topBrands.map((brand) => (
            <Link
              href={`/brands/${brand.slug}`}
              key={brand.id}
              className="flex flex-col items-center gap-2"
            >
              <div key={brand.id}>
                {brand.resource ? (
                  <Image
                    src={brand.resource?.url}
                    alt=""
                    height={200}
                    width={200}
                  />
                ) : null}
              </div>
              <div className="text-sm">{brand.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-32 block">
        <h2 className="font-semibold text-3xl text-center mt-8">
          Our Categories
        </h2>
        <div className="grid grid-cols-2 gap-5 items-center md:flex mt-8 justify-center">
          {categories.map((category, index) => {
            return index < 4 ? (
              <Link
                href={`/categories/${category.slug}`}
                key={category.id}
                className="flex flex-col gap-4 items-center group"
              >
                <div key={category.id} className="overflow-hidden">
                  {category.resource ? (
                    <Image
                      className="w-[650px] h-[500px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                      src={category.resource?.url}
                      alt=""
                      height={1000}
                      width={1000}
                    />
                  ) : null}
                </div>
                <div className="text-lg font-semibold">{category.name}</div>
              </Link>
            ) : null;
          })}
        </div>
      </div>
      <Link href="/products">
        <button className="border mt-10 border-black py-3 px-9 text-xl block mx-auto transition-colors duration-700 ease-in-out hover:bg-black hover:text-white">
          Explore More
        </button>
      </Link>

      {/* <div className="flex border mx-8 py-16 px-8 flex-col-reverse items-center gap-8 md:flex-row mt-32">
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="font-semibold leading-tight text-5xl">
            Introducing our premium brands
          </h1>
          <div>Join our community and experience the benefits today!</div>
          <div className="font-semibold mt-2">
            <Link href="/brands">
              <Button>Discover Brands</Button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative px-8 sm:px-16 xl:px-32">
          <Image
            src="/Home/hero2.png"
            alt=""
            layout="responsive"
            // objectFit="contain"
            width={1}
            height={1}
          />
        </div>
      </div> */}

      {/* <div className="h-4 bg-[#f0f0f0] mx-80" /> */}

      {/* <div className="flex px-4 lg:px-16 flex-col md:items-center gap-8 md:flex-row mt-32">
        <div className="w-full md:w-1/2 relative px-8 sm:px-16 xl:px-32">
          <Image
            src="/Home/hero3.png"
            alt=""
            layout="responsive"
            // objectFit="contain"
            width={1}
            height={1}
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="font-semibold leading-tight text-4xl">
            All your window needs in one place.
          </h1>
          <span className="">
            We take your window requirements seriously, which is why we offer a
            wide range of high-quality window solutions. Our products are
            designed to enhance the beauty and functionality of your space.
          </span>
          <div className="font-semibold mt-2">
            <Button>Learn More</Button>
          </div>
        </div>
      </div> */}

      {/* <div className="flex px-4 lg:px-16 flex-col-reverse items-center gap-8 md:flex-row mt-32">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="font-semibold leading-tight text-5xl">
            Discover our Portfolio
          </h1>
          <span className="leading-tight">
            Explore Our Diverse Portfolio of Projects and Offerings
          </span>
          <div className="font-semibold mt-2">
            <Link href={"/portfolio"}>
              <Button>Discover Portfolio</Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative px-8 md:px-16 xl:px-32">
          <Image
            src="/Home/hero4.png"
            alt=""
            layout="responsive"
            // objectFit="contain"
            width={1}
            height={1}
          />
        </div>
      </div>

      <div className="bg-[#f0f0f0] flex px-4 lg:px-16 flex-col md:items-center gap-8 md:flex-row mt-72">
        <div className="md:w-1/2">
          <div className="relative bottom-48 w-3/5">
            <Image
              src="/Home/hero5.png"
              alt=""
              layout="responsive"
              // objectFit="contain"
              width={1}
              height={1}
            />
          </div>
          <div className="relative bottom-48 flex flex-col gap-8 mt-8">
            <h1 className="font-medium leading-tight text-5xl">
              How to choose the perfect window
            </h1>
            <div className="leading-tight">
              Just 3 simple steps to enhance your space with our windows.
            </div>
            <div className="font-semibold">
              <Link href={"/contact"}>
                <Button>Contact us</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col sm:px-8 sm:pr-24 relative bottom-24 md:bottom-0 gap-8">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl">Step 1</h2>
            <div>
              Contact us to schedule a consultation and discuss your window
              needs.
            </div>
          </div>
          <hr className="h-2" />
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl">Step 2</h2>
            <div>
              Our experts will guide you in selecting the ideal window solution
              based on your requirements.
            </div>
          </div>
          <hr className="h-2" />
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl">Step 3</h2>
            <div>Discover the power of optimized window solutions.</div>
          </div>
        </div>
      </div> */}

      <div className="mt-64 flex flex-col items-center text-center px-4 lg:px-16">
        <h2 className="font-medium text-5xl">Client Testimonials</h2>
        <div className="mt-4">Explore our diverse client projects</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-24 mt-12">
          {(testimonials.length
            ? testimonials
            : [
                {
                  description:
                    "Since installing Vinayak Fenster Systems, our clients have been thrilled with the results.",
                  name: "John Doe",
                  starRating: 5,
                },
                {
                  description:
                    "Since installing Vinayak Fenster Systems, our clients have been thrilled with the results.",
                  name: "John Doe",
                  starRating: 4,
                },
                {
                  description:
                    "Since installing Vinayak Fenster Systems, our clients have been thrilled with the results.",
                  name: "John Doe",
                  starRating: 5,
                },
              ]
          ).map((testimonial, i) => (
            <div
              className="bg-[#f0f0f0] sm:m-6 p-12 flex flex-col items-center"
              key={i}
            >
              <span className="text-base font-medium">
                &quot; {testimonial.description}&quot;
              </span>
              <div className="flex mt-4 gap-4">
                {Array.from(Array(testimonial.starRating).keys()).map((i) => (
                  <IoIosStarOutline key={i} />
                ))}
              </div>
              <span className="font-medium mt-4">{testimonial.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 md:mt-64 flex-col-reverse md:flex-row flex mx-4 lg:mx-16 p-4 md:p-16 bg-[#f0f0f0]">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="font-semibold leading-tight text-4xl md:text-5xl">
            Transform Your Spaces with Vinayak Fenster Systems
          </h1>
          <div>Discover the Difference Today</div>
          <div className="font-semibold mt-2">
            <Link href="/contact">
              <Button>Contact us</Button>
            </Link>
          </div>
        </div>
        <div className="w-full p-4 md:p-0 md:w-1/2 relative px-8 md:px-16 xl:px-32">
          <Image
            src="/Home/hero6.png"
            alt=""
            layout="responsive"
            // objectFit="contain"
            width={1}
            height={1}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
