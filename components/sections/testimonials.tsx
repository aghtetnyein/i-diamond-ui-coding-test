import Image from "next/image";
import { getTestimonials } from "@/lib/testimonials";

export async function Testimonials() {
  // An upstream outage should hide the section, not fail the build or the page.
  const testimonials = await getTestimonials().catch(() => []);
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="mx-auto max-w-6xl px-6 py-16">
      <h2 id="testimonials-heading" className="text-2xl font-semibold">
        Testimonials
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.map(({ id, name, role, quote, rating, avatar }) => (
          <li key={id}>
            <figure className="flex h-full flex-col border p-6">
              <p className="text-sm" aria-label={`Rated ${rating} out of 5`}>
                ★ {rating}
              </p>
              <blockquote className="mt-2 flex-1">{quote}</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Image src={avatar} alt="" width={40} height={40} className="rounded-full" />
                <span className="text-sm">
                  <span className="block font-medium">{name}</span>
                  <span className="text-neutral-600">{role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
