import Link from "next/link";
import { FC } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

const links = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
  },
];

export const Footer: FC = () => {
  return (
    <footer
      className={`grid  sm:grid-cols-3 opaci bg-black p-8 md:p-14 text-white w-full`}
    >
      <div className="flex flex-col sm:items-center">
        <h5 className="font-semibold text-xl">Quick Links</h5>
        <ul className="flex flex-col sm:items-center pt-2 gap-2">
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <hr className="my-4 sm:hidden" />
      <div className="flex flex-col sm:items-center">
        <h5 className="font-semibold text-xl">Get Social</h5>
        <div className="flex sm:justify-center pt-2 gap-2">
          <Link href="https://facebook.com/vinayakfenster" target="_blank">
            <AiOutlineFacebook size="32" />
          </Link>
          <Link href="https://instagram.com/vinayakfenster" target="_blank">
            <AiOutlineLinkedin size="32" />
          </Link>
          <Link href="https://twitter.com/vinayakfenster" target="_blank">
            <AiOutlineTwitter size="32" />
          </Link>
          <Link
            href="https://linkedin.com/company/vinayak-fenster"
            target="_blank"
          >
            <AiOutlineInstagram size="32" />
          </Link>
        </div>
      </div>
      <hr className="my-4 sm:hidden" />
      <div className="flex flex-col sm:items-center">
        <h5 className="font-semibold text-xl">Contact Us</h5>
        <div className="flex flex-col sm:text-center sm:justify-center pt-2">
          <p>
            101-102, Samruddhi Plaza,100 ft. Road, Near Ashoka Palace Garden,
            Shobhagpura, Udaipur (Raj.)
          </p>

          <div className="mt-4">
            <span>Phone: </span>
            <Link href="tel:+91-9928288523">+91 99282 88523</Link>
          </div>
          <div>
            <span>Email: </span>
            <Link href="mailto:info@vinayakfenster.com">
              info@vinayakfenster.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
