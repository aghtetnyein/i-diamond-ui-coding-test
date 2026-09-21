import Image from "next/image";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";
import model from "@/public/images/explore-diamond.jpg";

const GUIDES = [
  "How to Select the Ideal Wedding Band",
  "How to Choose the Engagement Ring",
  "Lab Grown Diamond Guide",
  "Ring Size Guide",
];

export function ExploreMore() {
  return (
    <section className="mx-auto max-w-[1440px] lg:relative">
      <div className="container-page pt-[70px] lg:pb-[101px]">
        <h2 className="font-serif text-[26px] leading-[35px] text-ink lg:text-[32px] lg:leading-[43px] lg:tracking-[0.32px]">
          Explore More
        </h2>
        <p className="mt-2.5 text-sm leading-[18px] tracking-[0.14px] text-muted lg:mt-[15px] lg:w-[432px]">
          Looking for more diamond guides, buying tips or details about the 4Cs? Explore more of our diamond
          education pages:
        </p>

        <ul className="mt-[41px] grid gap-2.5 sm:grid-cols-2 sm:gap-x-10 lg:mt-[31px] lg:w-fit lg:grid-cols-[318px] lg:gap-x-[70px] lg:gap-y-[23px] xl:grid-flow-col xl:grid-cols-[318px_318px] xl:grid-rows-2">
          {GUIDES.map((title) => (
            <li key={title}>
              <Link
                href="/"
                className="group flex items-center justify-between gap-5 text-xs tracking-[0.12px] lg:text-sm lg:tracking-[0.14px]"
              >
                <span className="underline-offset-2 group-hover:underline">{title}</span>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-muted transition-colors duration-200 group-hover:border-navy group-hover:bg-navy group-hover:text-white lg:size-[50px]">
                  <BsBoxArrowUpRight aria-hidden className="size-[13px] lg:size-[15px]" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Image
        src={model}
        alt="Model wearing a diamond necklace, ring and earrings"
        sizes="(min-width: 1280px) 590px, 100vw"
        placeholder="blur"
        className="mt-[30px] h-[210px] w-full object-cover md:h-[340px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-[41%]"
      />
    </section>
  );
}
