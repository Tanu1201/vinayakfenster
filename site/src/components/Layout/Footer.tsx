import Link from 'next/link'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="bottom-0 mt-24 border-t pt-12 pb-24 w-full border-[#f0f0f0]">
      <div className="px-4 lg:px-16 grid grid-cols-2 lg:flex gap-16 md:gap-48 text-sm">
        <div className="md:w-1/4">
          <Link href="/" className="text-xl font-semibold">
            <span>Vinayak</span>
          </Link>
          <p className="mt-2">
            {new Date().getFullYear()} © Vinayak Fenster Systems.
          </p>
        </div>
        <ul className="md:w-1/4 flex flex-col gap-4">
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/about">About us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <ul className="md:w-1/4 flex flex-col gap-4">
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/about">About us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>{' '}
        <ul className="md:w-1/4 flex flex-col gap-4">
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/about">About us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
