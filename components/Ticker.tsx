"use client";

import { useRef } from "react";
import { site } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotion } from "@/components/providers/MotionProvider";

const ITEMS = [
  site.announcement,
  site.locationLine,
  site.shop,
  "Fades · Tapers · Scissors · Beard",
  "Book the chair",
];

export function Ticker() {
  const root = useRef<HTMLDivElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const track = root.current?.querySelector(".marquee-track");
      if (!track) return;
      gsap.to(track, {
        xPercent: -50,
        duration: 42,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  useGSAP(
    () => {
      if (reduced || !ready) return;
      const shift = root.current?.querySelector(".marquee-shift");
      if (!shift) return;
      gsap.fromTo(
        shift,
        { x: 0 },
        {
          x: -220,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.35,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced, ready] },
  );

  const row = [...ITEMS, ...ITEMS];

  return (
    <div
      ref={root}
      className="relative overflow-hidden border-y border-gold/15 bg-leather py-4"
      aria-hidden
    >
      <div className="marquee-shift">
        <div className="marquee-track flex items-center gap-10 pr-10">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10">
              {row.map((item, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="font-display text-3xl tracking-tight whitespace-nowrap text-gold-soft/90 uppercase md:text-5xl"
                >
                  {item}
                  <span className="mx-8 inline-block text-chrome">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
