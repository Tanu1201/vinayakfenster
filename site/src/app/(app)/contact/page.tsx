import { siteConfig } from "@/lib/siteConfig"
import { Metadata, NextPage } from "next"
import Link from "next/link"
import { AiOutlineClockCircle } from "react-icons/ai"
import { IoLocationOutline, IoMailOutline } from "react-icons/io5"
import { MdOutlineLocalPhone } from "react-icons/md"
import { ContactForm } from "./components/ContactForm"

export const generateMetadata = (): Metadata => ({
  title: "Contact" + " | " + siteConfig.name,
})

const Contact: NextPage = () => {
  return (
    <div className="">
      <h1 className="text-2xl sm:text-4xl px-4 lg:px-16 leading-normal tracking-normal sm:w-3/5 font-semibold text-[#00000050] ">
        &apos;Let&apos;s Transform Your Space Together!&apos; Reach Out to
        Vinayak Fenster Systems and Start the Conversation.
      </h1>

      <h2 className="text-2xl sm:text-4xl px-4 lg:px-16 font-semibold mt-8 ">
        Get in Touch 👋
      </h2>

      <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 px-4 lg:px-16 w-full">
          <ContactForm />
        </div>
        <div className="flex-1 w-full px-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3297.336606946182!2d73.71291766115664!3d24.621546085730248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5a2f8b3a2e5%3A0xf0d6ac3ecf71d04a!2sVinayak%20Fenster%20Systems%20-%20uPVC%20and%20Aluminum%20Window%20Expert%2C%20Curtains%2C%20Blinds%2C%20Door%20Hardware!5e0!3m2!1sen!2sin!4v1702915913792!5m2!1sen!2sin"
            // width="300"
            height="450"
            className="border-0 rounded-xl w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="px-4 lg:px-16">
        <h2 className="font-medium text-4xl mt-16">Office Address</h2>
        <div className="mt-8 s sm:w-3/5 flex flex-col gap-8">
          <div className="flex gap-4">
            <IoLocationOutline size={24} />
            <Link
              href="https://maps.app.goo.gl/4biu3gyM5huYK9sc8"
              target="_blank"
              className="w-4/5"
            >
              6, Behind Mundra Elite, Meera Nagar, 100ft. Road Shobhagpura, Udaipur
            </Link>
          </div>
          <div className="flex gap-4">
            <IoMailOutline size={24} />
            <Link href="mailto:info@vinayakfenster.com">
              info@vinayakfenster.com
            </Link>
          </div>
          <div className="flex gap-4">
            <MdOutlineLocalPhone size={24} />
            <Link href="tel:+919928288523">+91-9928288523</Link>
          </div>
          <div className="flex gap-4">
            <AiOutlineClockCircle size={24} />
            <span>10:00 AM to 08:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
