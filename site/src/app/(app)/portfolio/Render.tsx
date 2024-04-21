'use client'

import { Button } from '@/components/UI/Button'
import { Modal } from '@/components/UI/Modal'
import Image from 'next/image'
import { FC, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GetPortfolioFnDatatype } from './action'

export const Render: FC<{ portfolios: GetPortfolioFnDatatype }> = ({
  portfolios
}) => {
  const [selectedPortflio, setSelectedPortfolio] = useState<
    GetPortfolioFnDatatype[0] | null
  >(null)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="relative h-[600px] overflow-hidden">
          <Image
            alt="Beautiful room with fensters, windows, and curtains"
            className="absolute inset-0 object-cover w-full h-full"
            height={600}
            src="/Hero Image.png"
            style={{
              aspectRatio: '1200/600',
              objectFit: 'cover'
            }}
            width={1200}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Vinayak Fenster
              </h1>
              <p className="text-lg text-white sm:text-2xl">
                A complete window solution
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1 py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Our Projects</h2>
              {/* <div className="flex items-center space-x-2">
              <Button>Residential</Button>
              <Button>Commercial</Button>
              <Button>Blinds</Button>
              <Button>Curtains</Button>
            </div> */}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolios.map(item => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
                >
                  <button
                    className="absolute inset-0 z-10 outline-none"
                    onClick={() => {
                      setModalOpen(true)
                      setSelectedPortfolio(item)
                    }}
                  >
                    <span className="sr-only">View Details</span>
                  </button>
                  <Image
                    alt="Project Image"
                    className="aspect-[4/3] object-cover w-full h-64 group-hover:opacity-75 transition-opacity"
                    height={300}
                    src={item.portfolioImages?.[0]?.url || '/placeholder.svg'}
                    width={400}
                  />
                  <div className="p-4 bg-white">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button>
                      <button
                        onClick={() => {
                          setModalOpen(true)
                          setSelectedPortfolio(item)
                        }}
                        className="z-10"
                      >
                        View Details
                      </button>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {modalOpen && selectedPortflio?.portfolioImages.length ? (
        <Modal empty setModalOpen={setModalOpen}>
          {/* <div> */}
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            autoplay
            loop
            speed={500}
            className="max-h-screen"
          >
            {selectedPortflio.portfolioImages.map(img => (
              <SwiperSlide key={img.id} className="">
                <div className="relative flex items-center justify-center">
                  <Image src={img.url} alt="" width={500} height={500} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* </div> */}
        </Modal>
      ) : null}
    </>
  )
}
