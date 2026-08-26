"use client";

import { useRef } from "react";
import { story } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cinematicImage, revealOnScroll } from "@/lib/motion";
import { useMotion } from "@/components/providers/MotionProvider";

const beats = ["Cook", "Painter", "Barber"];

export function About() {
  const root = useRef<HTMLElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      if (reduced || !ready) return;

      const photo = root.current?.querySelector<HTMLElement>(".about-photo");
      const image = root.current?.querySelector<HTMLElement>(".about-photo-img");
      cinematicImage(image, photo, { amount: 10 });

      revealOnScroll(
        ".about-eyebrow, .about-title, .about-pull",
        ".about-copy-wrap",
        { y: 40, start: "top 88%", end: "top 55%" },
      );

      revealOnScroll(".about-copy p", ".about-copy", {
        y: 28,
        start: "top 90%",
        end: "top 62%",
      });

      gsap.utils.toArray<HTMLElement>(".about-beat").forEach((beat) => {
        revealOnScroll(beat, beat, {
          y: 18,
          start: "top 96%",
          end: "top 78%",
          scrub: 0.7,
        });
      });
    },
    { scope: root, dependencies: [reduced, ready] },
  );

  return (
    <section ref={root} id="story" className="relative bg-bone text-ink">
      <div className="section-pad mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="about-photo parallax-frame aspect-[3/4] rounded-[28px]">
          <img
            src="/media/albe-portrait.webp"
            alt="Albe, barber at Albe Styles"
            className="about-photo-img parallax-media object-[50%_18%]"
          />
          <p className="absolute bottom-5 left-5 z-10 font-mono text-[10px] tracking-[0.24em] text-bone uppercase">
            Albe · Minneapolis
          </p>
        </div>

        <div className="about-copy-wrap">
          <p className="about-eyebrow font-mono text-[11px] tracking-[0.3em] text-[#7a5a12] uppercase">
            {story.eyebrow}
          </p>
          <h2 className="about-title font-display mt-4 text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.9] uppercase">
            {story.title}
          </h2>
          <p className="about-pull mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            {story.pull}
          </p>
          <div className="about-copy mt-8 max-w-xl space-y-4 text-[15px] leading-relaxed text-ink/75">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {beats.map((beat, index) => (
              <span
                key={beat}
                className="about-beat inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase"
              >
                <span className="text-[#7a5a12]">{String(index + 1).padStart(2, "0")}</span>
                {beat}
                {index < beats.length - 1 ? (
                  <span className="text-ink/30">→</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
