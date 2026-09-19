import { Suspense } from "react";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <Suspense>
      <Testimonials />
    </Suspense>
  );
}
