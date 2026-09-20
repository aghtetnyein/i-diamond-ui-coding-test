import { GiDiamondHard } from "react-icons/gi";
import { IoRibbonOutline } from "react-icons/io5";
import { PiUserCircleCheckLight } from "react-icons/pi";

const REASONS = [
  {
    icon: PiUserCircleCheckLight,
    title: "Personal Design Consultation",
    text: "Work with our designers to create your perfect piece.",
  },
  {
    icon: GiDiamondHard,
    title: "Crafted with Luxury Materials",
    text: "Only the finest diamonds, gemstones, and precious metals used.",
  },
  {
    icon: IoRibbonOutline,
    title: "Lifetime Warranty",
    text: "Lifetime warranty on every piece, ensuring quality and lasting beauty.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-tint">
      <div className="container-page relative overflow-clip pt-[70px] pb-[120px] lg:pt-[77px] lg:pb-[117px]">
        <div aria-hidden className="absolute -bottom-[269px] -left-[27px] h-[585px] w-[742px] lg:-bottom-[331px] lg:left-[811px]">
          <div className="absolute top-0 left-[198px] size-[544px] rounded-full bg-navy/10" />
          <div className="absolute top-[186px] left-0 size-[399px] rounded-full bg-navy/10" />
        </div>

        <h2 className="heading-section relative text-center leading-[50px]">Why Choose MyJewel?</h2>

        <ul className="relative mt-5 grid gap-5 lg:mt-10 lg:grid-cols-[repeat(3,minmax(0,400px))] lg:gap-[33px]">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col items-center gap-[15px] bg-white p-5 text-center shadow-card duration-300 ease-out hover:shadow-[0_6px_24px_0_rgb(122_122_122/0.18)] motion-safe:transition motion-safe:hover:-translate-y-1 lg:gap-5">
              <Icon aria-hidden className="size-[35px] text-navy lg:size-[45px]" />
              <h3 className="font-serif text-base leading-[21px] font-semibold tracking-[0.48px] text-navy lg:text-xl lg:leading-[27px] lg:tracking-[0.6px]">
                {title}
              </h3>
              <p className="max-w-[305px] text-sm leading-[18px] text-muted lg:max-w-none lg:text-base lg:leading-[21px]">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
