import { ExploreMore } from "@/components/sections/explore-more";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyChoose } from "@/components/sections/why-choose";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <WhyChoose />
      <ExploreMore />
      <Testimonials />
    </>
  );
}
