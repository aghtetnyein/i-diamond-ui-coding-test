import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineCalendarDays, HiOutlineUserCircle } from "react-icons/hi2";
import { IoBagOutline, IoHeartOutline, IoSearchOutline } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";

const NAV_ITEMS = [
  { label: "Jewelry", hasMenu: true },
  { label: "Love and Engagement", hasMenu: true },
  { label: "Gifts", hasMenu: true },
  { label: "Custom Jewelry" },
  { label: "About" },
  { label: "Contact us" },
];

const CART_COUNT = 1;

function Announcement() {
  return (
    <p className="flex items-center gap-[5px] text-[8px] leading-[1.6] tracking-[0.24px] text-navy lg:gap-2.5 lg:text-[11px] lg:tracking-[0.33px]">
      <span aria-hidden className="size-0.5 rounded-full bg-navy lg:size-1" />
      Exclusive Collection Launch: Discover Timeless Elegance Today
      <span aria-hidden className="size-0.5 rounded-full bg-navy lg:size-1" />
    </p>
  );
}

function ShopLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Link href="/" aria-label="Wishlist" className="hover:opacity-60">
        <IoHeartOutline className="size-full" />
      </Link>
      <Link href="/" aria-label={`Bag, ${CART_COUNT} item`} className="relative hover:opacity-60">
        <IoBagOutline className="size-full" />
        <span className="absolute -top-[3px] left-2.5 flex size-[11.6px] items-center justify-center rounded-full bg-body text-[7px] font-semibold text-white lg:hidden">
          {CART_COUNT}
        </span>
      </Link>
    </div>
  );
}

export function Header() {
  return (
    <header className="relative z-10 bg-white shadow-card lg:shadow-none">
      <div className="relative flex h-[25px] items-center justify-center border-b border-line lg:h-[35px] lg:border">
        <Link
          href="/"
          className="absolute left-10 hidden items-center gap-1.5 text-[10px] leading-[1.6] tracking-[0.3px] text-navy uppercase hover:opacity-60 lg:flex"
        >
          <HiOutlineCalendarDays className="size-5" />
          Book an appointment
        </Link>
        <Announcement />
        <div className="absolute right-10 hidden items-center gap-5 text-navy lg:flex">
          <Link href="/" aria-label="Account" className="size-[17px] hover:opacity-60">
            <HiOutlineUserCircle className="size-full" />
          </Link>
          <ShopLinks className="flex gap-5 *:size-[17px]" />
        </div>
      </div>

      <div className="flex h-[60px] items-center justify-between pr-3 pl-[13px] lg:h-20 lg:items-stretch lg:border-b lg:border-line lg:px-0">
        <div className="flex items-center gap-2.5 text-ink lg:hidden">
          <details className="mobile-menu">
            <summary aria-label="Menu" className="block cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <TbMenu2 className="size-[18px]" />
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute top-full left-0 flex w-full flex-col border-t border-line bg-white px-[15px] py-2.5 shadow-card"
            >
              {NAV_ITEMS.map(({ label }) => (
                <Link key={label} href="/" className="py-2.5 text-[13px] tracking-[1.04px] text-body uppercase">
                  {label}
                </Link>
              ))}
            </nav>
          </details>
          <Link href="/" aria-label="Book an appointment">
            <HiOutlineCalendarDays className="size-[18px]" />
          </Link>
        </div>

        <Link
          href="/"
          aria-label="MyJewel home"
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:flex lg:w-[252px] lg:translate-x-0 lg:items-center lg:border-r lg:border-line lg:pl-[65px]"
        >
          <Image src="/logo.svg" alt="MyJewel" width={134} height={35} preload className="h-[25px] w-[94px] lg:h-[35px] lg:w-[134px]" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-[15px] pl-[21px] lg:flex">
          {NAV_ITEMS.map(({ label, hasMenu }) => (
            <Link
              key={label}
              href="/"
              className="flex items-center gap-2 px-5 py-0.5 text-[13px] leading-[1.6] tracking-[1.04px] whitespace-nowrap text-body uppercase hover:text-ink"
            >
              {label}
              {hasMenu && <FiChevronDown className="size-[13px]" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 text-ink lg:w-[104px] lg:justify-end lg:border-l lg:border-line lg:pr-[34px]">
          <ShopLinks className="flex gap-2.5 *:size-[18px] lg:hidden" />
          <button type="button" aria-label="Search" className="size-[18px] hover:opacity-60 lg:size-[30px]">
            <IoSearchOutline className="size-full lg:p-1" />
          </button>
        </div>
      </div>
    </header>
  );
}
