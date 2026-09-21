import Image, { getImageProps } from "next/image";
import pattern from "@/public/images/hero-bg.png";
import patternMobile from "@/public/images/hero-bg-mobile.png";
import diamonds from "@/public/images/hero-diamonds.jpg";
import jewelry from "@/public/images/hero-jewelry.jpg";
import ring from "@/public/images/hero-ring.jpg";

const ARTWORK = [
  {
    src: jewelry,
    preload: true,
    sizes: "(min-width: 1280px) 534px, (min-width: 768px) 220px, 143px",
    className: "bottom-0 left-0 w-[143px] md:w-[220px] lg:w-[534px]",
  },
  {
    src: diamonds,
    sizes: "(min-width: 1280px) 248px, (min-width: 768px) 120px, 89px",
    className: "top-0 right-0 w-[89px] md:w-[120px] lg:w-[248px]",
  },
  {
    src: ring,
    sizes: "(min-width: 1280px) 541px, (min-width: 768px) 230px, 186px",
    className: "right-0 bottom-0 w-[186px] md:w-[230px] lg:w-[541px]",
  },
];

const TABLET_UP = "(min-width: 768px)";
const EMPTY_PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

// <picture> lets each screen download only its own pattern file, which two hidden-by-CSS images would not.
function Pattern() {
  const wide = getImageProps({ src: pattern, alt: "", sizes: "468px" }).props.srcSet;
  const { props: narrow } = getImageProps({ src: patternMobile, alt: "", sizes: "100vw", loading: "eager" });

  return (
    <>
      <picture>
        <source media={TABLET_UP} srcSet={wide} sizes="468px" />
        <img {...narrow} alt="" className="absolute top-0 left-0 size-full md:w-auto" />
      </picture>
      <picture>
        <source media={TABLET_UP} srcSet={wide} sizes="468px" />
        <img src={EMPTY_PIXEL} alt="" className="absolute top-0 right-0 hidden h-full w-auto -scale-x-100 md:block" />
      </picture>
    </>
  );
}

export function Hero() {
  return (
    <section className="bg-hero">
      <div className="relative mx-auto flex h-[300px] max-w-[1440px] items-center justify-center overflow-clip lg:h-[420px]">
        <Pattern />

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

        <div className="relative w-[286px] text-center text-body md:w-auto lg:w-[639px]">
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
