"use client";

import { useRef } from "react";
import { reviews } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/motion";
import { useMotion } from "@/components/providers/MotionProvider";

export function Reviews() {
  const root = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      if (reduced || !ready) return;

      revealOnScroll(".reviews-head > *", ".reviews-head", {
        y: 36,
        start: "top 90%",
        end: "top 62%",
      });

      const row = root.current?.querySelector<HTMLElement>(".review-row");
      if (!row) return;

      gsap.fromTo(
        row,
        { x: 32 },
        {
          x: () => Math.min(0, window.innerWidth - row.scrollWidth - 40),
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            end: "bottom top",
            scrub: 1.15,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced, ready] },
  );

  return (
    <section ref={root} className="section-pad overflow-hidden min-h-[100svh]">
      <div className="mx-auto max-w-[1440px]">
        <div className="reviews-head">
          <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
            Google · From the chair
          </p>
          <h2 className="font-display mt-3 text-[clamp(2.4rem,5vw,4.6rem)] uppercase">
            People don’t come back for a gimmick.
          </h2>
        </div>
      </div>
      <div className="review-row mt-12 flex w-max gap-5 px-[clamp(1.25rem,4vw,4.5rem)]">
        {reviews.map((review) => (
          <blockquote
            key={review.name}
            className="review-card rounded-[24px] border border-white/10 bg-panel p-7"
          >
            <p className="text-[15px] leading-relaxed text-bone/90">
              “{review.quote}”
            </p>
            <footer className="mt-8 flex items-center justify-between">
              <cite className="not-italic">
                <span className="block font-medium">{review.name}</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
                  {review.source}
                </span>
              </cite>
              <span className="font-mono text-gold">★★★★★</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
