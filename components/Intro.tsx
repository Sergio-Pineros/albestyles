"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/motion";
import { useMotion } from "@/components/providers/MotionProvider";

export function Intro() {
  const root = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      if (reduced || !ready) return;

      revealOnScroll(".intro-eyebrow, .intro-title", root.current, {
        y: 48,
        start: "top 92%",
        end: "top 58%",
      });

      revealOnScroll(".intro-copy p", ".intro-copy", {
        y: 32,
        start: "top 90%",
        end: "top 60%",
      });

      gsap.fromTo(
        ".intro-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: root.current,
            start: "top 86%",
            end: "top 52%",
            scrub: 0.85,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".intro-stat").forEach((stat) => {
        revealOnScroll(stat, stat, {
          y: 28,
          start: "top 94%",
          end: "top 70%",
          scrub: 0.8,
        });
      });
    },
    { scope: root, dependencies: [reduced, ready] },
  );

  return (
    <section ref={root} id="work" className="section-pad relative">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="intro-eyebrow font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
            Real haircuts by a professional barber
          </p>
          <h2 className="intro-title font-display mt-4 max-w-[14ch] text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.9] uppercase">
            Tailored to your head. Not a template.
          </h2>
          <div className="intro-line lineup mt-8 max-w-xl origin-left" />
        </div>
        <div className="intro-copy max-w-md space-y-5 text-[15px] leading-relaxed text-mute">
          <p>
            At Albe Styles we deliver modern and classic men’s haircuts tailored
            to your style. From precision fades and clean tapers to scissor cuts
            for medium and longer hair, every service is designed to enhance your
            look with detail, balance, and a professional grooming experience.
          </p>
          <p>
            Ready for a fresh, sharp look? Book the chair in North Loop and
            leave looking confident — not rushed.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1440px] grid-cols-2 gap-6 border-t border-white/8 pt-10 md:grid-cols-4">
        {[
          { k: "North Loop", v: "New home at SAVRON" },
          { k: "Consultation", v: "Every appointment starts here" },
          { k: "Fades & tapers", v: "Skin-to-length, no step" },
          { k: "Scissor work", v: "Medium and longer hair" },
        ].map((item) => (
          <div key={item.k} className="intro-stat">
            <p className="font-mono text-[10px] tracking-[0.22em] text-chrome uppercase">
              {item.k}
            </p>
            <p className="mt-2 text-sm text-bone/85">{item.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
