import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className="lg:px-16 py-4 fixed w-full z-50 flex items-center bg-white border-b border-[#f0f0f0]">
      <Link href={'/'} className="h-20 w-40 relative">
        <Image src="/Header Logo.png" alt="Logo" fill objectFit="contain" />
      </Link>
      <ul className="flex gap-8 font-medium text-base ml-16">
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
    </header>
  )
}
