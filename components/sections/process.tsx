import Image from "next/image";
import Link from "next/link";
import photoLarge from "@/public/images/process-1.jpg";
import photoSmall from "@/public/images/process-2.jpg";

const STEPS = [
  { title: "Consultation", text: "We discuss your vision and preferences to craft a unique design." },
  { title: "Selecting Materials", text: "Choose from exquisite diamonds, precious metals, and gemstones." },
  { title: "Creating a 3D Model", text: "Visualize your design with a precise 3D model before production." },
  { title: "Manufacturing", text: "Expert artisans bring your piece to life with precision and care." },
  { title: "Quality Assurance", text: "Every detail is inspected to ensure flawless craftsmanship." },
  { title: "Delivery", text: "Your custom jewelry is elegantly packaged and delivered to you." },
];

export function Process() {
  return (
    <section className="container-page pt-[18px] pb-[70px] lg:pt-[21px] lg:pb-[100px]">
      <nav aria-label="Breadcrumb" className="text-sm leading-[22px] text-muted">
        <Link href="/">Home</Link> / <span aria-current="page" className="text-body">Custom Jewelry</span>
      </nav>

      <div className="mt-10 lg:mt-[57px] lg:grid lg:grid-cols-[511px_minmax(0,678px)] lg:grid-rows-[auto_1fr] lg:justify-between lg:gap-x-10">
        <div>
          <h2 className="font-serif text-[26px] leading-[42px] text-ink lg:text-4xl lg:leading-[48px] lg:tracking-[0.36px]">
            Custom Jewelry
          </h2>
          <p className="mt-2.5 text-sm leading-[22px] tracking-[0.42px] lg:mt-5 lg:w-[382px] lg:text-xl lg:leading-8 lg:tracking-[0.6px]">
            Create Your Masterpiece: Bespoke Jewelry Crafted for You
          </p>
        </div>

        <div className="mt-[18px] flex flex-col gap-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:gap-10">
          <p className="order-last text-sm leading-[22px] lg:order-first lg:max-w-[559px] lg:text-base lg:leading-[26px] lg:tracking-[0.48px]">
            Exquisite design, flawless craftsmanship, and timeless elegance—your vision, perfectly crafted.
          </p>
          <ol className="flex flex-col gap-7 lg:gap-[30px]">
            {STEPS.map(({ title, text }, index) => (
              <li key={title} className="flex gap-2.5 lg:gap-[17px]">
                <span className="w-[18px] shrink-0 pt-px text-sm leading-[1.6] tracking-[0.14px] text-muted lg:w-[26px] lg:text-xl lg:tracking-[0.2px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="w-[300px] border-b border-line pb-[9px] md:w-auto md:flex-1 lg:pb-[29px]">
                  <h3 className="text-base leading-[21px] font-medium tracking-[0.96px] text-ink uppercase lg:text-2xl lg:leading-[38px] lg:tracking-[2.4px]">
                    {title}
                  </h3>
                  <p className="mt-[5px] text-sm leading-[18px] text-muted lg:mt-2.5 lg:text-xl lg:leading-8">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mx-auto mt-[30px] h-[431px] w-[345px] max-w-full lg:col-start-1 lg:mx-0 lg:row-start-2 lg:h-[639px] lg:w-[511px]">
          <Image
            src={photoLarge}
            alt="Marquise diamond eternity band held in a gloved hand"
            sizes="(min-width: 1280px) 373px, 252px"
            placeholder="blur"
            className="h-[321px] w-[252px] object-cover lg:h-[476px] lg:w-[373px]"
          />
          <Image
            src={photoSmall}
            alt="Solitaire diamond ring held between gloved fingers"
            sizes="(min-width: 1280px) 239px, 161px"
            placeholder="blur"
            className="absolute right-0 bottom-0 h-[214px] w-[161px] border-[4.5px] border-white object-cover lg:h-[317px] lg:w-[239px] lg:border-[6.6px]"
          />
        </div>
      </div>
    </section>
  );
}
