"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

type Props = {
  label: string;
  children: ReactNode;
};

const ARROW =
  "absolute top-1/2 flex size-[35px] -translate-y-1/2 items-center justify-center rounded-full border border-body bg-white text-body enabled:hover:bg-body enabled:hover:text-white disabled:border-line-strong disabled:text-line-strong lg:size-[45px]";

export function Carousel({ label, children }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [{ page, pages }, setPosition] = useState({ page: 0, pages: 1 });

  const pageWidth = () => {
    const track = trackRef.current!;
    return track.clientWidth + parseFloat(getComputedStyle(track).columnGap);
  };

  useEffect(() => {
    const track = trackRef.current!;

    const sync = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const pages = Math.ceil(maxScroll / pageWidth() - 0.01) + 1;
      const atEnd = track.scrollLeft >= maxScroll - 1;
      setPosition({ pages, page: atEnd ? pages - 1 : Math.round(track.scrollLeft / pageWidth()) });
    };

    const observer = new ResizeObserver(sync);
    observer.observe(track);
    track.addEventListener("scroll", sync, { passive: true });

    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", sync);
    };
  }, []);

  const goTo = (target: number) => trackRef.current!.scrollTo({ left: target * pageWidth(), behavior: "smooth" });

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="flex flex-col items-center gap-5 lg:gap-[30px]">
      <div className="relative w-[300px] md:w-[615px] min-[62.5rem]:w-[930px] lg:w-full">
        <div
          ref={trackRef}
          tabIndex={0}
          className="scrollbar-none flex snap-x snap-mandatory gap-[15px] overflow-x-auto *:shrink-0 *:snap-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:gap-[26.66px]"
        >
          {children}
        </div>

        <button
          type="button"
          aria-label="Previous"
          disabled={page === 0}
          onClick={() => goTo(page - 1)}
          className={`${ARROW} left-0 -translate-x-1/2`}
        >
          <HiOutlineChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          disabled={page === pages - 1}
          onClick={() => goTo(page + 1)}
          className={`${ARROW} right-0 translate-x-1/2`}
        >
          <HiOutlineChevronRight className="size-5" />
        </button>
      </div>

      <div className="flex gap-2.5">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to page ${index + 1}`}
            aria-current={index === page}
            onClick={() => goTo(index)}
            className={`size-2 rounded-full ${index === page ? "bg-muted" : "bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
