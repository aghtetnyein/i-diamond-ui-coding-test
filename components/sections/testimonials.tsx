import Image from "next/image";
import { Carousel } from "@/components/carousel";
import { getTestimonials } from "@/lib/testimonials";

export async function Testimonials() {
  // An upstream outage should hide the section, not fail the build or the page.
  const testimonials = await getTestimonials().catch(() => []);
  if (testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="container-page flex flex-col gap-5 py-[70px] lg:gap-[30px] lg:py-[100px]"
    >
      <h2 id="testimonials-heading" className="heading-section text-center leading-[35px] tracking-[0.26px] lg:leading-[50px]">
        Testimonials
      </h2>

      <Carousel label="Testimonials">
        {testimonials.map(({ id, name, role, quote, avatar }) => (
          <figure
            key={id}
            className="flex h-[326px] w-[300px] flex-col items-center justify-center gap-[16.8px] border border-line px-[15px] py-[21px] text-center"
          >
            <Image src={avatar} alt="" width={120} height={120} className="size-[120px] object-cover" />
            <figcaption className="flex flex-col gap-[5px]">
              <span className="text-sm leading-[18px] font-semibold">{name}</span>
              <span className="text-xs leading-4 text-subtle">{role}</span>
            </figcaption>
            <blockquote className="line-clamp-4 w-[250px] text-sm leading-5">{quote}</blockquote>
          </figure>
        ))}
      </Carousel>
    </section>
  );
}
