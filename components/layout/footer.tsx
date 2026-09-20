import Image from "next/image";
import Link from "next/link";
import { LiaFacebook, LiaInstagram } from "react-icons/lia";
import { NewsletterForm } from "@/components/newsletter-form";

const COLUMNS = [
  {
    title: "Contact us",
    links: ["Book Appointment", "Visit Our Stores", "Email Us", "Contact Us", "Schedule a consultation"],
  },
  {
    title: "The Art of Gifting",
    links: ["Luxury Gift Wrapping", "Gift Cards", "Private & White-Glove Delivery"],
  },
  {
    title: "Bespoke & Services",
    links: ["Custom Jewelry Design", "Private Jewelry Consultations", "Jewelry Restoration & Care"],
  },
];

const PAYMENT_METHODS = [
  { name: "Visa", src: "/payments/visa.svg" },
  { name: "Mastercard", src: "/payments/mastercard.svg" },
  { name: "American Express", src: "/payments/amex.svg" },
  { name: "Apple Pay", src: "/payments/apple-pay.svg" },
  { name: "Tabby", src: "/payments/tabby.svg" },
];

const LEGAL_LINKS = ["Terms & Conditions", "Privacy Policy", "Site Map"];

const SOCIALS = [
  { name: "Facebook", icon: LiaFacebook },
  { name: "Instagram", icon: LiaInstagram },
];

export function Footer() {
  return (
    <footer className="bg-footer">
      <div className="container-page pt-[50px] lg:pt-[86px]">
        <div className="lg:grid lg:min-h-[210px] lg:grid-cols-[254px_264px_264px_minmax(0,1fr)]">
          {COLUMNS.map(({ title, links }) => (
            <nav key={title} aria-label={title} className="border-b border-line pt-2.5 pb-[9px] lg:border-0 lg:py-0">
              <h2 className="text-sm leading-[18px] font-semibold tracking-[0.14px] uppercase lg:text-base lg:leading-[21px] lg:tracking-[0.16px]">
                {title}
              </h2>
              <ul className="mt-0.5 text-sm leading-[30px] tracking-[0.14px] lg:mt-[9px]">
                {links.map((label) => (
                  <li key={label}>
                    <Link href="/" className="hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="mt-[30px] lg:mt-0">
            <h2 className="text-base leading-[21px] font-semibold tracking-[0.16px]">Let’s Keep In Touch</h2>
            <NewsletterForm />

            <h2 className="mt-[23px] text-[13px] leading-[17px] font-semibold tracking-[0.13px] lg:mt-9 lg:text-base lg:leading-[21px] lg:tracking-[0.16px]">
              Payment Methods
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3 lg:mt-[15px] lg:gap-[15px]">
              {PAYMENT_METHODS.map(({ name, src }) => (
                <li key={name}>
                  <Image src={src} alt={name} width={58} height={40} className="h-8 w-[46px] grayscale lg:h-10 lg:w-[57.5px]" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[30px] flex flex-wrap items-center lg:mt-[59px] lg:h-[60px] lg:flex-nowrap lg:border-t lg:border-line">
          <p className="order-last mt-[5px] w-full border-t border-line py-2.5 text-center text-[10px] leading-[13px] tracking-[0.1px] lg:order-first lg:mt-0 lg:mr-auto lg:w-auto lg:border-0 lg:py-0 lg:text-sm lg:leading-[18px] lg:tracking-[0.14px]">
            © 2025, All Rights Reserved - MyJewel
          </p>
          <ul className="mr-auto flex gap-5 text-[8px] leading-[10px] tracking-[0.08px] lg:mr-[30px] lg:gap-[30px] lg:text-xs lg:leading-4 lg:tracking-[0.12px]">
            {LEGAL_LINKS.map((label) => (
              <li key={label}>
                <Link href="/" className="hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex gap-[5px] lg:gap-[25px]">
            {SOCIALS.map(({ name, icon: Icon }) => (
              <li key={name}>
                <Link href="/" aria-label={name} className="hover:opacity-60">
                  <Icon className="size-[18px] lg:size-[25px]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
