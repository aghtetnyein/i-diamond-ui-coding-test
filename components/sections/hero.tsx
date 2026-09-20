import Image from "next/image";
import pattern from "@/public/images/hero-bg.png";
import patternMobile from "@/public/images/hero-bg-mobile.png";
import diamonds from "@/public/images/hero-diamonds.jpg";
import jewelry from "@/public/images/hero-jewelry.jpg";
import ring from "@/public/images/hero-ring.jpg";

const ARTWORK = [
  {
    src: jewelry,
    preload: true,
    sizes: "(min-width: 1280px) 534px, 143px",
    className: "bottom-0 left-0 w-[143px] lg:w-[534px]",
  },
  {
    src: diamonds,
    sizes: "(min-width: 1280px) 248px, 89px",
    className: "top-0 right-0 w-[89px] lg:w-[248px]",
  },
  {
    src: ring,
    sizes: "(min-width: 1280px) 541px, 186px",
    className: "right-0 bottom-0 w-[186px] lg:w-[541px]",
  },
];

export function Hero() {
  return (
    <section className="bg-hero">
      <div className="relative mx-auto flex h-[300px] max-w-[1440px] items-center justify-center overflow-clip lg:h-[420px]">
        <Image src={patternMobile} alt="" sizes="100vw" className="absolute inset-0 size-full lg:hidden" />
        <Image src={pattern} alt="" sizes="468px" className="absolute left-0 hidden h-full w-[468px] lg:block" />
        <Image src={pattern} alt="" sizes="468px" className="absolute right-0 hidden h-full w-[468px] -scale-x-100 lg:block" />

        {/* The exports have a white backdrop; multiply drops it against the grey banner. */}
        {ARTWORK.map(({ src, sizes, className, preload }) => (
          <Image
            key={src.src}
            src={src}
            alt=""
            sizes={sizes}
            preload={preload}
            loading={preload ? undefined : "eager"}
            fetchPriority={preload ? undefined : "low"}
            className={`absolute h-auto mix-blend-multiply ${className}`}
          />
        ))}

        <div className="relative w-[286px] text-center text-body lg:w-[639px]">
          <h1 className="font-serif text-[26px] leading-[35px] tracking-[0.26px] lg:text-5xl lg:leading-[64px] lg:tracking-[0.48px]">
            Custom Jewelry
          </h1>
          <p className="mt-5 text-sm leading-[18px] tracking-[0.14px] lg:mt-[30px] lg:text-xl lg:leading-[26px] lg:tracking-[0.2px]">
            Create Your Masterpiece: Bespoke Jewelry Crafted for You
          </p>
        </div>
      </div>
    </section>
  );
}
