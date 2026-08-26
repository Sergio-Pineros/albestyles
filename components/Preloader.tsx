"use client";

import { useRef } from "react";
import { site } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotion } from "@/components/providers/MotionProvider";

const PRELOAD = [
  "/media/haircut.webp",
  "/media/beard-trim.webp",
  "/media/long-medium.webp",
  "/media/logo-mark-white.png",
];

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const { reduced, setReady } = useMotion();

  useGSAP(
    () => {
      const overlay = root.current;
      if (!overlay) return;

      if (
        reduced ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
        setReady(true);
        return;
      }

      let cancelled = false;
      let hidden = false;

      const writeCount = (value: number) => {
        const n = Math.round(value);
        if (bar.current) bar.current.style.width = `${n}%`;
        if (count.current) count.current.textContent = String(n).padStart(2, "0");
      };

      const hide = () => {
        if (cancelled || hidden) return;
        hidden = true;
        writeCount(100);
        overlay.style.pointerEvents = "none";
        overlay.classList.add("is-done");
        setReady(true);

        const tl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
          onComplete: () => {
            gsap.set(overlay, {
              autoAlpha: 0,
              pointerEvents: "none",
              yPercent: -110,
            });
          },
        });

        tl.to(".pre-brand", { y: -24, autoAlpha: 0, duration: 0.4 }, 0);
        tl.to(overlay, { yPercent: -110, autoAlpha: 0, duration: 0.75 }, 0.1);
      };

      const state = { value: 0 };
      const tween = gsap.to(state, {
        value: 86,
        duration: 1.05,
        ease: "power2.out",
        onUpdate: () => writeCount(state.value),
      });

      const loaders = PRELOAD.map(
        (src) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = src;
          }),
      );

      Promise.all([document.fonts.ready, ...loaders]).then(() => {
        window.setTimeout(() => {
          if (cancelled) return;
          tween.kill();
          gsap.to(state, {
            value: 100,
            duration: 0.28,
            ease: "power2.inOut",
            onUpdate: () => writeCount(state.value),
            onComplete: hide,
          });
        }, 180);
      });

      const safety = window.setTimeout(hide, 2600);

      return () => {
        cancelled = true;
        window.clearTimeout(safety);
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink"
      aria-hidden
    >
      <div className="pre-brand flex flex-col items-center gap-8">
        <img
          src="/media/logo-mark-white.png"
          alt=""
          width={500}
          height={500}
          className="h-28 w-28 object-contain md:h-32 md:w-32"
        />
        <p className="font-mono text-[10px] tracking-[0.42em] text-gold uppercase">
          {site.name}
        </p>
      </div>
      <div className="absolute right-8 bottom-8 left-8 flex items-end justify-between gap-6 md:right-12 md:bottom-12 md:left-12">
        <span
          ref={count}
          className="font-display text-5xl leading-none text-bone tabular-nums md:text-7xl"
        >
          00
        </span>
        <div className="mb-3 h-px flex-1 overflow-hidden bg-white/10">
          <div ref={bar} className="h-full w-0 bg-gold" />
        </div>
        <span className="mb-1 font-mono text-[10px] tracking-[0.28em] text-mute uppercase">
          Loading the chair
        </span>
      </div>
    </div>
  );
}
