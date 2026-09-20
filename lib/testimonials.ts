import { cacheLife } from "next/cache";

const API_ORIGIN = "https://testimonialapi.vercel.app";

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

type ApiTestimonial = {
  id: number;
  name: string;
  designation: string;
  message: string;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${API_ORIGIN}/api`);
  if (!res.ok) throw new Error(`Testimonials request failed: ${res.status}`);

  const data: ApiTestimonial[] = await res.json();

  return data.map(({ id, name, designation, message }) => ({
    id,
    name,
    role: designation.trim(),
    quote: message,
    // The payload's avatar URLs point at a retired host; the same files are served from the API origin.
    avatar: `${API_ORIGIN}/avatar/${id}.jpg`,
  }));
}
