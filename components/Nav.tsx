"use client";

import { useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { gsap, ScrollToPlugin, useGSAP } from "@/lib/gsap";
import { Magnetic } from "@/components/Magnetic";
import { useMotion } from "@/components/providers/MotionProvider";

export function Nav() {
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { ready, lenis } = useMotion();

  useGSAP(
    () => {
      if (!ready) {
        gsap.set(bar.current, { y: -24, autoAlpha: 0 });
        return;
      }
      gsap.to(bar.current, { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.15 });

      const onScroll = () => {
        const scrolled = window.scrollY > 24;
        gsap.to(bar.current, {
          backgroundColor: scrolled ? "rgba(8,7,5,0.78)" : "rgba(8,7,5,0)",
          borderColor: scrolled ? "rgba(201,162,74,0.18)" : "rgba(201,162,74,0)",
          duration: 0.35,
          overwrite: "auto",
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    },
    { dependencies: [ready], scope: bar },
  );

  useGSAP(
    () => {
      if (!overlay.current) return;
      if (open) {
        gsap.set(overlay.current, { display: "flex" });
        gsap.fromTo(
          overlay.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35 },
        );
        gsap.fromTo(
          ".menu-link",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.7, delay: 0.05 },
        );
      } else {
        gsap.to(overlay.current, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.set(overlay.current, { display: "none" });
          },
        });
      }
    },
    { dependencies: [open] },
  );

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target && lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -12 });
      } else if (target) {
        gsap.to(window, { duration: 0.9, scrollTo: { y: target, offsetY: 12 } });
      }
    }
  };

  return (
    <>
      <header
        ref={bar}
        className="fixed top-0 right-0 left-0 z-40 border-b border-transparent px-4 py-4 backdrop-blur-md md:px-8"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3" onClick={() => go("#top")}>
            <img
              src="/media/logo-wordmark-white.png"
              alt="Albe Styles"
              width={800}
              height={200}
              className="h-8 w-auto md:h-9"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link font-mono text-[11px] tracking-[0.22em] text-bone/80 uppercase"
                onClick={(event) => {
                  event.preventDefault();
                  go(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic>
              <a
                href={site.bookUrl}
                className="btn-gold max-sm:hidden"
                data-cursor="hover"
              >
                Book appointment
              </a>
            </Magnetic>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute top-0 left-0 h-px w-full bg-bone transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute top-1.5 left-0 h-px w-full bg-bone transition ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-bone transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlay}
        className="fixed inset-0 z-30 hidden flex-col justify-center bg-ink px-6 pt-28 pb-10"
        data-lenis-prevent
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="menu-link font-display text-6xl tracking-tight text-bone uppercase"
              onClick={(event) => {
                event.preventDefault();
                go(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href={site.bookUrl} className="btn-gold mt-10 w-full">
          Book appointment
        </a>
      </div>
    </>
  );
}

void ScrollToPlugin;
