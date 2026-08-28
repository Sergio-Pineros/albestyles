"use client";

import { useRef } from "react";
import { gallery } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cinematicImage, revealOnScroll } from "@/lib/motion";
import { useMotion } from "@/components/providers/MotionProvider";

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      if (!ready) return;

      revealOnScroll(".gal-intro > *", ".gal-intro", {
        y: 28,
        start: "top 90%",
        end: "top 62%",
      });

      const cards = gsap.utils.toArray<HTMLElement>(".gal-card");
      const track = root.current?.querySelector<HTMLElement>(".gal-wave-track");
      const wave = root.current?.querySelector<HTMLElement>(".gal-wave");
      const count = root.current?.querySelector<HTMLElement>(".gal-count");
      const bar = root.current?.querySelector<HTMLElement>(".gal-bar");
      const dots = gsap.utils.toArray<HTMLElement>(".gal-dot");

      const setIndex = (progress: number) => {
        const n = Math.min(
          cards.length - 1,
          Math.max(0, Math.round(progress * (cards.length - 1))),
        );
        if (count) count.textContent = String(n + 1).padStart(2, "0");
        dots.forEach((dot, i) => dot.classList.toggle("is-on", i === n));
      };

      if (track && wave && !reduced) {
        gsap.fromTo(
          track,
          { x: 32 },
          {
            x: () => Math.min(0, window.innerWidth - track.scrollWidth - 48),
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wave,
              start: "top 85%",
              end: "bottom top",
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          },
        );

        gsap.utils
          .toArray<HTMLElement>(".gal-wave-shot")
          .forEach((shot) => cinematicImage(shot, shot.parentElement, { amount: 9 }));
      }

      if (reduced) {
        gsap.set(cards, { clearProps: "all" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, i) => {
          gsap.set(card, {
            yPercent: i === 0 ? 0 : 100,
            scale: 1,
            force3D: true,
          });
        });

        const steps = Math.max(1, cards.length - 1);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage.current,
            pin: true,
            pinSpacing: true,
            pinType: "transform",
            scrub: 0.7,
            anticipatePin: 1,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * cards.length)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setIndex(self.progress);
              if (bar) gsap.set(bar, { scaleX: self.progress });
            },
          },
        });

        cards.forEach((card, i) => {
          const image = card.querySelector<HTMLElement>(".gal-card-img");
          const veil = card.querySelector<HTMLElement>(".gal-veil");

          if (i === 0) {
            if (image) {
              tl.fromTo(
                image,
                { yPercent: -8 },
                { yPercent: 10, duration: steps },
                0,
              );
            }
            return;
          }

          const at = i - 1;
          tl.to(card, { yPercent: 0, duration: 1, force3D: true }, at);
          if (image) {
            tl.fromTo(image, { yPercent: -11 }, { yPercent: 7, duration: 1 }, at);
          }
          tl.to(
            cards[i - 1],
            { scale: 0.86, duration: 1, force3D: true },
            at,
          );
          if (veil) tl.to(veil, { opacity: 0.38, duration: 1 }, at);
        });
      });

      mm.add("(max-width: 767px)", () => {
        cards.forEach((card) => {
          const image = card.querySelector<HTMLElement>(".gal-card-img");
          cinematicImage(image, card, { amount: 10 });
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced, ready] },
  );

  return (
    <section ref={root} id="gallery" className="relative bg-ink">
      <div className="gal-intro mx-auto max-w-[1440px] px-[clamp(1.25rem,4vw,4.5rem)] pt-[clamp(4.5rem,10vw,8.5rem)] pb-8">
        <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
          Gallery · Keep scrolling
        </p>
        <h2 className="font-display mt-3 max-w-[14ch] text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.88] uppercase">
          Under the clipper
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-mute">
          Five studies from the chair. Keep scrolling and each photo covers the
          last — skin, lineup, flow, taper, then the cape.
        </p>
      </div>

      <div ref={stage} className="gal-stage relative">
        <div className="gal-stack">
          {gallery.map((item, index) => (
            <article
              key={item.label}
              className="gal-card overflow-hidden bg-leather"
              style={{ zIndex: index + 1 }}
            >
              <img
                src={item.src}
                alt={item.note}
                className="gal-card-img"
                style={{ objectPosition: item.pos }}
              />
              <div className="gal-veil pointer-events-none absolute inset-0 bg-ink opacity-0" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 via-ink/15 to-transparent" />
              <div className="absolute right-6 bottom-10 left-6 z-10 md:right-10 md:bottom-14 md:left-10">
                <p className="font-mono text-[10px] tracking-[0.28em] text-chrome uppercase">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(gallery.length).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-1 text-5xl uppercase md:text-7xl">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm text-bone/80">{item.note}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute top-5 right-[clamp(1.25rem,4vw,4.5rem)] z-20 hidden items-center gap-3 md:flex">
          <span className="gal-count font-mono text-[11px] tracking-[0.22em] text-gold uppercase">
            01
          </span>
          <div className="h-px w-20 origin-left overflow-hidden bg-white/15">
            <div className="gal-bar h-full w-full origin-left scale-x-0 bg-gold" />
          </div>
          <div className="flex gap-1.5">
            {gallery.map((item, index) => (
              <span
                key={item.label}
                className={`gal-dot h-1.5 rounded-full ${index === 0 ? "is-on" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="gal-wave relative overflow-hidden py-16 md:py-24">
        <div className="gal-wave-track flex w-max items-end gap-5 px-[clamp(1.25rem,4vw,4.5rem)]">
          {gallery.map((item, index) => (
            <figure
              key={`wave-${item.label}`}
              className={`gal-wave-item relative overflow-hidden rounded-[28px] border border-white/10 ${
                index % 2 === 0 ? "mb-10" : "mt-10"
              }`}
            >
              <img
                src={item.src}
                alt=""
                className="gal-wave-shot parallax-media"
                style={{ objectPosition: item.pos }}
              />
              <figcaption className="absolute right-0 bottom-0 left-0 bg-ink/65 px-4 py-3 font-mono text-[10px] tracking-[0.2em] text-bone uppercase">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
