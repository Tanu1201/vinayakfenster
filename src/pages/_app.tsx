import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`bg-background ${lato.className}`}>
      <div className="h-96 bg-primary opacity-60 rounded-full w-96 absolute -right-20 -top-32" />
      <Header />
      <div className="pt-28">
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  );
}
