"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotion } from "@/components/providers/MotionProvider";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const { ready, reduced } = useMotion();

  useGSAP(
    () => {
      if (!ready || reduced || !bar.current) return;
      gsap.fromTo(
        bar.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.35,
          },
        },
      );
    },
    { dependencies: [ready, reduced] },
  );

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 right-4 z-50 hidden h-full w-px bg-white/10 md:block"
      aria-hidden
    >
      <div
        ref={bar}
        className="h-full w-full origin-top scale-y-0 bg-gold"
      />
    </div>
  );
}
