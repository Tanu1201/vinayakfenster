"use client";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./UI/Button";

const images = [
  {
    url: "/Home/banner/5.jpeg",
    heading: "The Perfect way to showcase",
    text: "Here you can find the best window solutions for your project.",
    buttonText: "Learn More",
    buttonLink: "/portfolio",
  },
  {
    url: "/Home/banner/6.jpeg",
    heading: "The Perfect way to showcase",
    text: "Here you can find the best window solutions for your project.",
    buttonText: "Learn More",
    buttonLink: "/portfolio",
  },
  {
    url: "/Home/banner/7.jpeg",
    heading: "The Perfect way to showcase",
    text: "Here you can find the best window solutions for your project.",
    buttonText: "Learn More",
    buttonLink: "/portfolio",
  },
  {
    url: "/Home/banner/8.webp",
    heading: "The Perfect way to showcase",
    text: "Here you can find the best window solutions for your project.",
    buttonText: "Learn More",
    buttonLink: "/portfolio",
  },
];

export const HomeBanner = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      className="w-full h-full "
      navigation
      autoplay
      loop
      speed={500}
      centeredSlides
    >
      {images.map((img, i) => (
        <SwiperSlide
          key={i}
          className="h-full -z-10 w-full swiper-button-white"
        >
          <div className="relative h-[700px] px-4 lg:px-16 w-full overflow-hidden">
            <Image
              alt="Beautiful room with fensters, windows, and curtains"
              className="absolute inset-0  w-full h-full"
              height={1200}
              // layout="fill"
              objectFit="cover"
              src={img.url}
              style={{
                aspectRatio: "1200/600",
                objectFit: "cover",
              }}
              width={2000}
            />
            {img.heading ? (
              <div className="absolute inset-0 bg-black/40" />
            ) : null}
            <div className="relative z-10 flex flex-col w-1/2 space-y-4 justify-center h-full px-4 text-white">
              {img.heading ? (
                <h1 className="font-semibold leading-tight text-5xl md:text-7xl">
                  {img.heading}
                </h1>
              ) : null}
              {img.text ? <span className="text-lg">{img.text}</span> : null}
              {img.buttonText ? (
                <Link href={img.buttonLink} className="font-semibold mt-2">
                  <Button white>{img.buttonText}</Button>
                </Link>
              ) : null}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
