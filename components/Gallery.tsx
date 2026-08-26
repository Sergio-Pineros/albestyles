"use client";

import { useRef, useState } from "react";
import { gallery } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cinematicImage, revealOnScroll } from "@/lib/motion";
import { useMotion } from "@/components/providers/MotionProvider";

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (reduced || !ready) return;

      revealOnScroll(".gal-head > *", ".gal-head", {
        y: 36,
        start: "top 90%",
        end: "top 60%",
      });

      const frame = root.current?.querySelector<HTMLElement>(".gal-frame");
      const photo = root.current?.querySelector<HTMLElement>(".gal-photo");
      cinematicImage(photo, frame, { amount: 8 });

      gsap.utils.toArray<HTMLElement>(".gal-thumb").forEach((thumb) => {
        revealOnScroll(thumb, thumb, {
          y: 24,
          start: "top 96%",
          end: "top 78%",
          scrub: 0.75,
        });
      });
    },
    { scope: root, dependencies: [reduced, ready] },
  );

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".gal-photo",
        { autoAlpha: 0.72 },
        { autoAlpha: 1, duration: 0.55, ease: "power2.out" },
      );
    },
    { dependencies: [active, reduced], scope: root },
  );

  const item = gallery[active];

  return (
    <section ref={root} className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        <div className="gal-head flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
              Gallery · Small details
            </p>
            <h2 className="font-display mt-3 text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.9] uppercase">
              Under the clipper
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mute">
            The work lives in millimeters — the fade, the cheek line, the weight
            in the top. Hover the studies. Let them pace themselves.
          </p>
        </div>

        <div className="gal-frame parallax-frame relative mt-12 rounded-[28px] border border-white/10">
          <div className="relative aspect-[16/10] min-h-[320px] md:aspect-[16/8]">
            <img
              src={item.src}
              alt={item.note}
              className="gal-photo parallax-media"
              style={{ objectPosition: item.pos }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute right-6 bottom-6 left-6 z-10 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.28em] text-chrome uppercase">
                  {String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                </p>
                <p className="font-display mt-1 text-4xl uppercase md:text-6xl">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-bone/80">{item.note}</p>
              </div>
              <div className="hidden h-16 w-16 items-center justify-center rounded-full border border-gold/40 md:flex">
                <span className="h-8 w-8 rounded-full border border-chrome/70" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {gallery.map((study, index) => (
            <button
              key={study.label}
              type="button"
              data-cursor="hover"
              className={`gal-thumb group relative overflow-hidden rounded-2xl border text-left ${
                index === active
                  ? "border-gold"
                  : "border-white/10 hover:border-chrome/50"
              }`}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              <img
                src={study.src}
                alt=""
                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                style={{ objectPosition: study.pos }}
              />
              <span className="absolute right-0 bottom-0 left-0 bg-ink/70 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-bone uppercase">
                {study.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
