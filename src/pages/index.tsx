import { Button } from '@/components/UI/Button'
import { NextPage } from 'next'
import Image from 'next/image'
import { IoIosStarOutline } from 'react-icons/io'

const Home: NextPage = () => {
  return (
    <div className="">
      <div className="flex px-4 lg:px-16 flex-col items-center gap-8 md:flex-row mt-8">
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="font-semibold leading-tight text-7xl">
            The Perfect <br />
            way
            <br />
            to showcase
          </h1>
          <span className="text-lg">
            Here you can find the best window solutions <br />
            for your project.
          </span>
          <div className="font-semibold mt-2">
            <Button>Learn More</Button>
          </div>
        </div>
        <div className="md:w-1/2 relative px-8 md:px-16 xl:px-32">
          <Image
            src="/Home/hero.png"
            alt=""
            layout="responsive"
            // objectFit="contain"
            width={1}
            height={1}
          />
        </div>
      </div>

      <div className="mt-16">
        <div className="text-center font-semibold text-lg">
          Trusted by individuals and teams at top <br />
          companies worldwide
        </div>

        <div className="flex mt-8 justify-center gap-16">
          {[
            {
              name: 'Brand 1'
            },
            {
              name: 'Brand 2'
            },
            {
              name: 'Brand 3'
            },
            {
              name: 'Brand 4'
            },
            {
              name: 'Brand 5'
            }
          ].map((brand, i) => (
            <div
              key={i}
              className="flex font-semibold text-xl items-center justify-center"
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex border mx-8 py-16 px-8 flex-col-reverse items-center gap-8 md:flex-row mt-32">
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="font-semibold leading-tight text-5xl">
            Introducing <br />
            our premium brands
          </h1>
          <div>
            Join our community and experience <br />
            the benefits today!
          </div>
          <div className="font-semibold mt-2">
            <Button>Discover Brands</Button>
          </div>
        </div>
        <div className="md:w-1/2 relative px-8 md:px-16 xl:px-32">
          <Image
            src="/Home/hero2.png"
            alt=""
            layout="responsive"
            // objectFit="contain"
            width={1}
            height={1}
          />
        </div>
      </div>
      <div className="h-4 bg-[#f0f0f0] mx-80" />

      <div className="flex px-4 lg:px-16 flex-col items-center gap-8 md:flex-row mt-32">
        <div className="md:w-1/2 relative px-8 md:px-16 xl:px-32">
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
            All your window <br />
            needs <br />
            in one place.
          </h1>
          <span className="">
            We take your window requirements <br />
            seriously, which is why we offer a wide <br />
            range of high-quality window solutions. <br />
            Our products are designed to enhance <br />
            the beauty and functionality of your <br />
            space.
          </span>
          <div className="font-semibold mt-2">
            <Button>Learn More</Button>
          </div>
        </div>
      </div>

      <div className="flex px-4 lg:px-16 flex-col items-center gap-8 md:flex-row mt-32">
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="font-semibold leading-tight text-5xl">
            Cost-effective <br />
            window solutions
          </h1>
          <span className="leading-tight">
            Powerful tools that help you save <br />
            money without compromising on
            <br />
            quality. With our diverse range of <br />
            window solutions and expert
            <br />
            advice, you can optimize your <br />
            window projects and achieve cost <br />
            savings.
          </span>
          <div className="font-semibold mt-2">
            <Button>Discover More</Button>
          </div>
        </div>
        <div className="md:w-1/2 relative px-8 md:px-16 xl:px-32">
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

      <div className="bg-[#f0f0f0] flex px-4 lg:px-16 flex-col items-center gap-8 md:flex-row mt-72">
        <div className="w-1/2">
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
              How to choose <br /> the perfect <br />
              window
            </h1>
            <div className="leading-tight">
              Just 3 simple steps to enhance your space with our windows.
            </div>
            <div className="font-semibold">
              <Button>Contact us</Button>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col px-8 pr-24 gap-8">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl">Step 1</h2>
            <div>
              Contact us to schedule a <br /> consultation and discuss your
              <br /> window needs.
            </div>
          </div>
          <hr className="h-2" />
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl">Step 2</h2>
            <div>
              Our experts will guide you in <br />
              selecting the ideal window solution
              <br />
              based on your requirements.
            </div>
          </div>
          <hr className="h-2" />
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl">Step 3</h2>
            <div>
              Discover the power of optimized <br /> window solutions.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-64 flex flex-col items-center text-center px-4 lg:px-16">
        <h2 className="font-medium text-5xl">Client Testimonials</h2>
        <div className="mt-4">Explore our diverse client projects</div>
        <div className="grid grid-cols-3 gap-24 mt-12">
          {[
            {
              testimonial:
                'Since installing Vinayak Fenster Systems, our clients have been thrilled with the results.',
              name: 'John Doe',
              designation: 'Clients Project Manager'
            },
            {
              testimonial:
                'Since installing Vinayak Fenster Systems, our clients have been thrilled with the results.',
              name: 'John Doe',
              designation: 'Clients Project Manager'
            },
            {
              testimonial:
                'Since installing Vinayak Fenster Systems, our clients have been thrilled with the results.',
              name: 'John Doe',
              designation: 'Clients Project Manager'
            }
          ].map((testimonial, i) => (
            <div
              className="bg-[#f0f0f0] m-6 p-12 flex flex-col items-center"
              key={i}
            >
              <span className="text-base font-medium">
                Since installing Vinayak Fenster Systems, our clients have been
                {testimonial.testimonial}
              </span>
              <div className="flex mt-4 gap-4">
                <IoIosStarOutline />
                <IoIosStarOutline />
                <IoIosStarOutline />
                <IoIosStarOutline />
                <IoIosStarOutline />
              </div>
              <span className="font-medium mt-4">{testimonial.name}</span>
              <span className="text-sm mt-2">{testimonial.designation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-64 flex mx-4 lg:mx-16 p-16 bg-[#f0f0f0]">
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="font-semibold leading-tight text-5xl">
            Transform Your <br /> Spaces with <br /> Vinayak Fenster <br />{' '}
            Systems
          </h1>
          <div>Discover the Difference Today</div>
          <div className="font-semibold mt-2">
            <Button>Contact us</Button>
          </div>
        </div>
        <div className="md:w-1/2 relative px-8 md:px-16 xl:px-32">
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
    </div>
  )
}

export default Home
