'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'

const navLinks = [
  {
    title: 'Home',
    url: '/'
  },
  {
    title: 'About',
    url: '/about'
  },
  {
    title: 'Contact',
    url: '/contact'
  },
  {
    title: 'Portfolio',
    url: '/portfolio'
  },
  {
    title: 'Brands',
    url: '/brands'
  }
]

const checkRoute = (currRoute: string, link: string) => {
  return '/' + currRoute.split('/')[1] === link
}

export const Header: FC = () => {
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false)
  const currRoute = usePathname() || '/'

  useEffect(() => {
    if (phoneMenuOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [phoneMenuOpen])

  return (
    <header className="lg:px-16 px-4 sm:py-4 fixed w-full z-50 flex justify-between md:justify-normal items-center bg-white border-b border-[#f0f0f0]">
      <Link href={'/'} className="h-20 w-40 relative">
        <Image src="/Header Logo.png" alt="Logo" fill objectFit="contain" />
      </Link>
      <ul className="gap-8 font-medium text-base ml-16 hidden md:flex">
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/brands">Brands</Link>
        </li>
      </ul>
      <HiOutlineMenuAlt3
        size={36}
        className={`md:hidden ${phoneMenuOpen ? 'hidden' : 'block'}`}
        onClick={() => setPhoneMenuOpen(true)}
      />
      <CgClose
        size={36}
        onClick={() => {
          setPhoneMenuOpen(false)
        }}
        className={`md:hidden ${phoneMenuOpen ? 'block' : 'hidden'} z-50`}
      />
      <AnimatePresence>
        {phoneMenuOpen && (
          <motion.div
            className="md:hidden absolute top-0 left-0 w-screen h-screen bg-white py-2 px-4 flex flex-col items-end"
            initial={{
              x: '100%',
              opacity: 0
            }}
            animate={{
              x: 0,
              opacity: 0.95
            }}
            exit={{
              x: '100%',
              opacity: 0
            }}
            transition={{
              duration: 0.3
            }}
          >
            <ul className="flex flex-col py-8 px-1 pt-32">
              {navLinks.map((item, i) => (
                <li
                  key={i}
                  className={`relative text-2xl font-bold px-4 py-4 animated  text-right hover:text-secondary ${
                    checkRoute(currRoute, item.url)
                      ? 'text-secondary'
                      : 'text-gray-800'
                  }`}
                >
                  <Link
                    href={item.url}
                    className="nav-link-item-mobile"
                    onClick={() => {
                      setPhoneMenuOpen(false)
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
