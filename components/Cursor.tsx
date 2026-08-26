"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/providers/MotionProvider";

export function Cursor() {
  const core = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();

  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;

    const coreEl = core.current;
    const ringEl = ring.current;
    if (!coreEl || !ringEl) return;

    const xCore = gsap.quickTo(coreEl, "x", { duration: 0.12, ease: "power3" });
    const yCore = gsap.quickTo(coreEl, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ringEl, "x", { duration: 0.35, ease: "power3" });
    const yRing = gsap.quickTo(ringEl, "y", { duration: 0.35, ease: "power3" });

    const onMove = (event: MouseEvent) => {
      xCore(event.clientX);
      yCore(event.clientY);
      xRing(event.clientX);
      yRing(event.clientY);
    };

    const hoverOn = () => {
      gsap.to(ringEl, { scale: 1.85, duration: 0.35, ease: "power3.out" });
    };
    const hoverOff = () => {
      gsap.to(ringEl, { scale: 1, duration: 0.35, ease: "power3.out" });
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor='hover']")) hoverOn();
    };
    const onOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor='hover']")) hoverOff();
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none max-md:hidden" aria-hidden>
      <div ref={core} className="cursor-core" />
      <div ref={ring} className="cursor-ring" />
    </div>
  );
}
