import { Button } from '@/components/UI/Button'
import { NextPage } from 'next'
import Image from 'next/image'

const About: NextPage = () => {
  return (
    <>
      <div className="text-center px-4 lg:px-12 2xl:px-96 xl:mx-44 mt-8">
        <h1 className="font-semibold text-3xl">About us</h1>
        <div className="mt-8">
          We provide a wide range of window solutions to meet your needs. Join
          the Vinayak Fenster community and experience the benefits of our top
          product brands today!
        </div>
        <Image
          src="/About/about1.png"
          alt="a person sitting outside a window"
          width={1}
          height={1}
          className=""
          layout="responsive"
        />
      </div>

      <div className="text-center px-4 lg:px-12 2xl:px-64 xl:mx-44 mt-16">
        <h2 className="font-semibold text-3xl">Our Mission</h2>
        <div className="mt-8">
          At Vinayak Fenster Systems, we are committed to providing excellent
          window solutions to our customers and clients. We believe that our
          products can make a positive impact on your projects and enhance the
          beauty and functionality of your spaces. Our team is dedicated to
          delivering the best possible service and support, and we are always
          looking for ways to improve and innovate.
        </div>
      </div>

      <div className="flex px-4 lg:px-16 flex-col-reverse items-center gap-8 md:flex-row mt-32">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="font-semibold leading-tight text-4xl md:text-5xl">
            Let&apos;s find the perfect windows for your projects!
          </h2>
        </div>
        <div className="w-full md:w-1/2 relative px-8 md:px-16 xl:px-32">
          <Image
            src="/About/about2.png"
            alt=""
            layout="responsive"
            // objectFit="contain"
            width={1}
            height={1}
          />
        </div>
      </div>

      <div className="text-center px-4 lg:px-12 xl:mx-44 mt-32">
        <h2 className="font-semibold text-3xl mt-4">Our Team</h2>
        <div className="grid grid-cols-2 gap-y-16 md:grid-cols-4 mt-16">
          <div className="flex flex-col gap-1 w-full items-center justify-center">
            <div className="w-1/2 relative rounded-full border-2">
              <Image
                src="/Home/hero.png"
                className="rounded-full"
                alt=""
                layout="responsive"
                width={1}
                height={1}
                objectFit="contain"
              />
            </div>
            <span className="font-medium">John Smith</span>
            <span>CEO</span>
          </div>
          <div className="flex flex-col gap-1 w-full items-center justify-center">
            <div className="w-1/2 relative rounded-full border-2">
              <Image
                src="/Home/hero.png"
                className="rounded-full"
                alt=""
                layout="responsive"
                width={1}
                height={1}
                objectFit="contain"
              />
            </div>
            <span className="font-medium">John Smith</span>
            <span>CEO</span>
          </div>
          <div className="flex flex-col gap-1 w-full items-center justify-center">
            <div className="w-1/2 relative rounded-full border-2">
              <Image
                src="/Home/hero.png"
                className="rounded-full"
                alt=""
                layout="responsive"
                width={1}
                height={1}
                objectFit="contain"
              />
            </div>
            <span className="font-medium">John Smith</span>
            <span>CEO</span>
          </div>
          <div className="flex flex-col gap-1 w-full items-center justify-center">
            <div className="w-1/2 relative rounded-full border-2">
              <Image
                src="/Home/hero.png"
                className="rounded-full"
                alt=""
                layout="responsive"
                width={1}
                height={1}
                objectFit="contain"
              />
            </div>
            <span className="font-medium">John Smith</span>
            <span>CEO</span>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-12 xl:mx-44 mt-32">
        <div className="flex w-full">
          <div className="w-1/2 bg-[#D9D9D9] p-16">
            <h3 className="text-5xl font-semibold leading-snug">
              Start your window journey with us today!
            </h3>
            <div className="my-6">
              Find the perfect windows for your projects.
            </div>

            <Button>Get started now</Button>
          </div>
          <div className="w-1/2 relative">
            <Image
              src="/About/about3.jpeg"
              alt=""
              layout="fill"
              // width={1}
              // height={1}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default About
