import { Footer } from '@/components/Layout/Footer'
import { Header } from '@/components/Layout/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.className} text-[#030303]`}>
      <Header />
      <div className="pt-36">
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  )
}
