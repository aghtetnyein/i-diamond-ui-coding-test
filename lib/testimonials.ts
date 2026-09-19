import { cacheLife } from "next/cache";

const API_ORIGIN = "https://testimonialapi.vercel.app";

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
};

type ApiTestimonial = {
  id: number;
  name: string;
  designation: string;
  message: string;
  rating: number;
};

export async function getTestimonials(limit = 6): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${API_ORIGIN}/api`);
  if (!res.ok) throw new Error(`Testimonials request failed: ${res.status}`);

  const data: ApiTestimonial[] = await res.json();

  return data.slice(0, limit).map(({ id, name, designation, message, rating }) => ({
    id,
    name,
    role: designation.trim(),
    quote: message,
    rating,
    // The payload's avatar URLs point at a retired host; the same files are served from the API origin.
    avatar: `${API_ORIGIN}/avatar/${id}.jpg`,
  }));
}
