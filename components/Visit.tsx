"use client";

import { useRef } from "react";
import { hours, packages, site } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { Magnetic } from "@/components/Magnetic";
import { revealOnScroll } from "@/lib/motion";
import { useMotion } from "@/components/providers/MotionProvider";

export function Visit() {
  const root = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      if (reduced || !ready) return;

      const bg = root.current?.querySelector<HTMLElement>(".visit-bg img");
      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -10, scale: 1.12 },
          {
            yPercent: 10,
            scale: 1,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          },
        );
      }

      revealOnScroll(".visit-copy > *", ".visit-copy", {
        y: 36,
        start: "top 88%",
        end: "top 56%",
      });

      gsap.utils.toArray<HTMLElement>(".visit-card").forEach((card) => {
        revealOnScroll(card, card, {
          y: 32,
          start: "top 94%",
          end: "top 68%",
          scrub: 0.85,
        });
      });

      gsap.utils.toArray<HTMLElement>(".pkg-row").forEach((row) => {
        revealOnScroll(row, row, {
          y: 22,
          start: "top 96%",
          end: "top 78%",
          scrub: 0.75,
        });
      });
    },
    { scope: root, dependencies: [reduced, ready] },
  );

  return (
    <section ref={root} id="visit" className="relative overflow-hidden">
      <div className="visit-bg absolute inset-0 overflow-hidden">
        <img
          src="/media/packs.webp"
          alt=""
          className="absolute inset-x-0 -top-[16%] h-[132%] w-full max-w-none object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/88 to-ink" />
      </div>

      <div className="section-pad relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="visit-copy">
          <p className="font-mono text-[11px] tracking-[0.3em] text-chrome uppercase">
            Visit · Book
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.9] uppercase">
            I’m waiting for you.
          </h2>
          <p className="mt-5 max-w-md text-mute">
            New location. Same standard. If you can dream it, we can cut it.
            Check the address on your confirmation email.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a href={site.bookUrl} className="btn-gold">
                Book appointment
              </a>
            </Magnetic>
            <a href={site.mapsUrl} className="btn-ghost" target="_blank" rel="noreferrer">
              Get directions
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="visit-card rounded-[24px] border border-white/10 bg-leather/80 p-6 backdrop-blur-md">
            <p className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase">
              Address
            </p>
            <p className="mt-3 text-lg leading-snug">{site.shop}</p>
            <p className="mt-1 text-sm text-mute">{site.address}</p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-gold uppercase">
              Hours
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {hours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-mute">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="visit-card rounded-[24px] border border-white/10 bg-leather/80 p-6 backdrop-blur-md">
            <p className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase">
              Contact
            </p>
            <a href={site.phoneHref} className="mt-3 block text-lg">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-mute">
              {site.email}
            </a>
            <a
              href={site.instagram}
              className="mt-6 inline-block font-mono text-[11px] tracking-[0.2em] text-chrome uppercase"
              target="_blank"
              rel="noreferrer"
            >
              {site.handle} on Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-[clamp(1.25rem,4vw,4.5rem)] pb-24">
        <p className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
          Services & packages
        </p>
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {packages.map((item) => (
            <div
              key={item.name}
              className="pkg-row flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8"
            >
              <p className="font-display text-2xl uppercase md:text-3xl">{item.name}</p>
              <p className="max-w-xl flex-1 text-sm text-mute">{item.includes}</p>
              <p className="font-mono text-gold">{item.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-mute">Your satisfaction is my goal.</p>
      </div>
    </section>
  );
}
