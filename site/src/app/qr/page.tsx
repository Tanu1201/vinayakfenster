import { Comic_Neue } from 'next/font/google'
import Link from 'next/link'
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { IoLocationOutline } from 'react-icons/io5'

const comic = Comic_Neue({ subsets: ['latin'], weight: '700' })

export default function Home() {
  return (
    <div className="gap-12 flex h-screen justify-center items-center flex-col bg-white text-black">
      <h1 className={`text-5xl ${comic.className}`}>Vinayak Fenster</h1>
      <div className="grid grid-cols-2 gap-24 gap-y-8 mt-12">
        <Link
          href="https://www.facebook.com/vinayakfenster/"
          className="flex flex-col items-center"
          target="_blank"
        >
          <BsFacebook size="48" />
          <p className="text-xl">Facebook</p>
        </Link>
        {/* <Link
          href="https://wa.me/917014706078?text=Hi%20I%20am%20interested%20in%20your%20services!"
          className="flex flex-col items-center"
        >
          <BsWhatsapp size="48" />
          <p className="text-xl">Whatsapp</p>
        </Link> */}

        {/* <Link href="tel:+917014706078" className="flex flex-col items-center">
          <BsTelephone size="48" />
          <p className="text-xl">Phone</p>
        </Link> */}
        <Link
          href="https://maps.app.goo.gl/1h8T1tsUYqbGiyht9"
          target="_blank"
          className="flex flex-col items-center"
        >
          <IoLocationOutline size="48" />
          <p className="text-xl">Location</p>
        </Link>
        <Link
          href="https://instagram.com/vinayakfenster"
          target="_blank"
          className="flex flex-col items-center col-span-2"
        >
          <BsInstagram size="48" />
          <p className="text-xl">Instagram</p>
        </Link>
      </div>
    </div>
  )
}
