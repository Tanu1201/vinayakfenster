'use client'

import Image from 'next/image'
import { FC } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ContactForm } from '../contact/components/ContactForm'

export const Render: FC = () => {
  return (
    <div className="bg-white shadow-md px-16 rounded-md text-gray-800">
      <div className="mb-8 text-center flex justify-center">
        <Image
          src="/Logo-Horizontal.png" // Replace with your Fenster company logo
          alt="Fenster Company Logo"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2">
          <h1 className="text-4xl my-5 font-bold">About Vinayak Fenster</h1>
          <p className="mb-6">
            Vinayak Fenster is a market leader in manufacturing uPVC profiles in
            India. With a countrywide presence, the company provides customized
            solutions in windows and doors to suit the harsh climatic and
            environmental conditions anywhere in India. <br />
            <br /> The company&apos;s supply chain and the manufacturing
            facility is well equipped to meet the growing business needs of our
            consumers globally. Vinayak Fenster has the largest network of
            dedicated fabricators who were well trained and well equipped with
            all the knowledge to help consumers get the best doors and
            windows solutions.
            {/* Established since 2009, Vinayak Fenster Systems deal in premium
            Italian Aluminium & German uPVC window system, premium blinds and
            curtains, German outdoor furniture, and few more. Some of our
            partner brands include: Hunter Douglas, AluK, VEKA, D Décor, Pure
            and GM Fabrics. All these are one of the leading brands in their
            respective segments and we have brought them altogether under one
            roof to give your property an ultra-modern and luxurious look. Over
            these years, we have built a reputation of delivering top quality
            windows and door solution to more than 450 customers, and that too
            from different sector - individual bungalows, hotels, resorts,
            apartments, business complexes, etc. */}
          </p>
        </div>
        <div className="md:w-1/2 justify-center items-center flex min-h-[300px]">
          <Swiper
            modules={[Navigation, Autoplay]}
            className="h-full w-full min-h-[300px]"
            navigation
            autoplay
            loop
            speed={500}
            centeredSlides
          >
            {[1, 2, 3, 4, 5].map(img => (
              <SwiperSlide key={img} className="">
                <div className="relative flex items-center h-full w-full justify-center min-h-[300px]">
                  <Image
                    src={`/About/${img}.jpg`}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Vision Section */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
        <p>
          We believe that your beloved property should tell your story and
          should reflect your lifestyle. This understanding means that we are
          passionate about finding stylish products which are as unique and
          individual as you are. Our expert team has searched across the world
          and hand-picked some top brands that are almost incomparable and
          typically only available to metro cities in India. We have made it
          reachable to the people of Udaipur, Jodhpur, Bhilwara, Kota,
          Ahmedabad, Surat and few more.
        </p>
      </section>

      {/* Quality Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Commitment to Quality</h2>
        <p>
          Quality is the cornerstone of our commitment. Each Fenster product is
          meticulously crafted using premium materials and cutting-edge
          technology, ensuring durability, energy efficiency, and timeless
          beauty for your home.
        </p>
      </section>

      {/* Expertise Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Expertise</h2>
        <p>
          With years of expertise in the fenestration industry, our team of
          skilled professionals is dedicated to delivering tailored solutions.
          Whether it&apos;s custom designs, energy-efficient solutions, or
          expert installation, Fenster is your trusted partner.
        </p>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col gap-4 py-8">
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p>
          Have questions or ready to start your fenestration project? Reach out
          to us! Our team is here to assist you. Let&apos;s turn your vision
          into reality with Fenster.
        </p>

        <ContactForm />
        {/* Add your contact form or contact information here */}
      </section>
    </div>
  )
}
