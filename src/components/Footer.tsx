import Link from 'next/link'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="bottom-0 mt-24 border-t pt-12 pb-24 w-full border-[#f0f0f0]">
      <div className="lg:px-16 flex gap-48 text-sm">
        <div className="w-1/4">
          <Link href="/" className="text-xl font-semibold">
            <span>Vinayak</span>
          </Link>
          <p className="mt-2">2023 © Vinayak Fenster Systems.</p>
        </div>
        <ul className="w-1/4 flex flex-col gap-4">
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
        <ul className="w-1/4 flex flex-col gap-4">
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
        <ul className="w-1/4 flex flex-col gap-4">
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
