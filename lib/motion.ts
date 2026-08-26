"use client";

import { gsap } from "@/lib/gsap";

export const SCRUB = 0.95;

type RevealOpts = {
  y?: number;
  start?: string;
  end?: string;
  scrub?: number;
};

export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger?: Element | string | null,
  opts: RevealOpts = {},
) {
  const { y = 32, start = "top 92%", end = "top 62%", scrub = SCRUB } = opts;
  const elements = gsap.utils.toArray<HTMLElement>(targets);
  if (!elements.length) return;

  gsap.fromTo(
    elements,
    { y, opacity: 0.18 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "none",
      stagger: elements.length > 1 ? 0.03 : 0,
      scrollTrigger: {
        trigger: trigger ?? elements[0],
        start,
        end,
        scrub,
      },
    },
  );
}

type ShotOpts = {
  amount?: number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
};

export function cinematicImage(
  image: Element | null | undefined,
  trigger: Element | null | undefined,
  opts: ShotOpts = {},
) {
  if (!image || !trigger) return;
  const { amount = 11, from = {}, to = {} } = opts;

  gsap.fromTo(
    image,
    { yPercent: -amount, scale: 1.1, ...from },
    {
      yPercent: amount,
      scale: 1,
      duration: 1,
      ease: "none",
      force3D: true,
      ...to,
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.05,
      },
    },
  );
}
