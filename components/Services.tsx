"use client";

import { useRef } from "react";
import { services, site } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cinematicImage, revealOnScroll } from "@/lib/motion";
import { useMotion } from "@/components/providers/MotionProvider";

export function Services() {
  const root = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      if (!ready || reduced) return;

      revealOnScroll(".svc-head > *", ".svc-head", {
        y: 36,
        start: "top 90%",
        end: "top 62%",
      });

      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((panel) => {
        const visual = panel.querySelector<HTMLElement>(".svc-visual");
        const image = panel.querySelector<HTMLElement>(".svc-image");
        const line = panel.querySelector<HTMLElement>(".svc-line");
        const copy = panel.querySelectorAll(".svc-copy > *");
        const theme = panel.dataset.theme;

        revealOnScroll(copy, panel, {
          y: 28,
          start: "top 88%",
          end: "top 55%",
          scrub: 0.9,
        });

        if (theme === "soft") {
          cinematicImage(image, visual, {
            from: { rotation: -1.4 },
            to: { rotation: 1 },
          });
        } else if (theme === "flow") {
          cinematicImage(image, visual, {
            from: { xPercent: -4 },
            to: { xPercent: 3 },
          });
        } else {
          cinematicImage(image, visual);
        }

        if (theme === "lineup" && line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: visual,
                start: "top 80%",
                end: "top 28%",
                scrub: 0.85,
              },
            },
          );
        }
      });
    },
    { scope: root, dependencies: [reduced, ready] },
  );

  return (
    <section ref={root} id="services" className="relative overflow-hidden bg-leather">
      <header className="svc-head mx-auto max-w-[1440px] px-[clamp(1.25rem,4vw,4.5rem)] pt-[clamp(4.5rem,10vw,8.5rem)] pb-6">
        <p className="font-mono text-[11px] tracking-[0.3em] text-chrome uppercase">
          The chair · Services
        </p>
        <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.9] uppercase">
          Every sit-down is a custom cut.
        </h2>
      </header>

      {services.map((service, index) => (
        <article
          key={service.id}
          data-theme={service.theme}
          className="svc-row mx-auto grid max-w-[1440px] items-center gap-10 px-[clamp(1.25rem,4vw,4.5rem)] py-16 lg:grid-cols-2 lg:gap-20 lg:py-24"
        >
          <div
            className={`svc-visual parallax-frame h-[48vh] rounded-[28px] border border-white/10 md:h-[56vh] lg:h-[64vh] ${
              index % 2 === 1 ? "lg:order-2" : ""
            }`}
          >
            {service.theme === "lineup" && (
              <div className="svc-line pointer-events-none absolute top-[12%] bottom-[18%] left-[58%] z-10 w-px origin-top bg-gold shadow-[0_0_18px_rgba(111,219,212,0.55)]" />
            )}
            <img
              src={service.image}
              alt={service.alt}
              className="svc-image parallax-media"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/40 to-transparent lg:bg-linear-to-r" />
          </div>

          <div className={`svc-copy relative z-10 max-w-xl ${index % 2 === 1 ? "lg:order-1" : ""}`}>
            <p className="font-mono text-[11px] tracking-[0.3em] text-chrome uppercase">
              {service.index} / 05 — Service
            </p>
            <h3 className="font-display mt-4 text-[clamp(3rem,7vw,6.2rem)] leading-[0.84] uppercase">
              {service.title}
            </h3>
            <p className="mt-2 font-display text-4xl text-gold md:text-5xl">
              {service.price}
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute">
              {service.summary}
            </p>
            <p className="mt-4 max-w-md text-sm text-bone/80">{service.detail}</p>
            <a href={site.bookUrl} className="btn-gold mt-8 w-fit">
              Book this
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
