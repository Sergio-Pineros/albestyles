"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, site } from "@/lib/content";
import { gsap, Observer, SplitText, useGSAP } from "@/lib/gsap";
import { Magnetic } from "@/components/Magnetic";
import { useMotion } from "@/components/providers/MotionProvider";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const blade = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const { ready, reduced, lenis } = useMotion();

  const go = useCallback(
    (next: number) => {
      const wrapped = (next + heroSlides.length) % heroSlides.length;
      if (wrapped === activeRef.current) return;
      activeRef.current = wrapped;
      setActive(wrapped);

      if (reduced || !blade.current) return;
      gsap.fromTo(
        blade.current,
        { xPercent: -40, autoAlpha: 0 },
        {
          xPercent: 140,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.inOut",
          onComplete: () => gsap.set(blade.current, { autoAlpha: 0 }),
        },
      );
    },
    [reduced],
  );

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".cf-card");
      cards.forEach((card, index) => {
        let offset = index - active;
        const half = Math.floor(heroSlides.length / 2);
        if (offset > half) offset -= heroSlides.length;
        if (offset < -half) offset += heroSlides.length;

        gsap.to(card, {
          x: offset * (window.innerWidth < 768 ? 118 : 210),
          z: -Math.abs(offset) * (window.innerWidth < 768 ? 90 : 170),
          rotateY: offset * -26,
          scale: offset === 0 ? 1 : 0.84,
          autoAlpha: Math.abs(offset) > 2 ? 0 : 1,
          filter: offset === 0 ? "brightness(1)" : "brightness(0.48)",
          duration: reduced ? 0 : 0.9,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    },
    { dependencies: [active, reduced], scope: root },
  );

  useGSAP(
    (_, contextSafe) => {
      if (!ready) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const motion = Boolean(context.conditions?.motion);

          if (!motion) {
            gsap.set([".hero-copy", ".hero-stage-wrap", ".hero-announcement"], {
              autoAlpha: 1,
              y: 0,
            });
            return;
          }

          const title = SplitText.create(".hero-title", {
            type: "chars,words",
            mask: "words",
          });

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.from(".hero-rings", { scale: 0.84, autoAlpha: 0, duration: 1.4 }, 0);
          tl.from(
            ".hero-announcement",
            { y: -16, autoAlpha: 0, duration: 0.7 },
            0.1,
          );
          tl.from(
            title.chars,
            { yPercent: 120, stagger: 0.018, duration: 0.9 },
            0.12,
          );
          tl.from(
            ".hero-lead",
            { y: 24, autoAlpha: 0, duration: 0.8 },
            0.38,
          );
          tl.from(
            ".hero-cta",
            { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.7 },
            0.48,
          );

          const revealUi = () => {
            gsap.set([".hero-cta", ".hero-lead", ".hero-announcement", ".hero-rings"], {
              autoAlpha: 1,
              y: 0,
            });
          };
          tl.eventCallback("onComplete", revealUi);
          const safety = window.setTimeout(revealUi, 1800);

          gsap.to(".hero-rings", {
            rotation: 360,
            duration: 120,
            ease: "none",
            repeat: -1,
          });

          const scrollId = window.setTimeout(() => {
            gsap.to(".hero-parallax", {
              yPercent: 14,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });

            gsap.to(".hero-rings", {
              yPercent: 24,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            });

            gsap.to(".hero-stage-wrap", {
              scale: 0.96,
              ease: "none",
              transformOrigin: "center center",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.05,
              },
            });

            gsap.to(".hero-scroll-cue", {
              autoAlpha: 0,
              y: 16,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "+=160",
                scrub: 0.6,
              },
            });
          }, 80);

          return () => {
            window.clearTimeout(safety);
            window.clearTimeout(scrollId);
          };
        },
      );

      const stageEl = stage.current;
      if (stageEl && !reduced && contextSafe) {
        const rotY = gsap.quickTo(stageEl, "rotationY", {
          duration: 0.85,
          ease: "power3",
        });
        const rotX = gsap.quickTo(stageEl, "rotationX", {
          duration: 0.85,
          ease: "power3",
        });

        const onMove = contextSafe((event: MouseEvent) => {
          const rect = stageEl.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          rotY(nx * 10);
          rotX(-ny * 6);
          gsap.to(".hero-rings", { x: nx * 24, y: ny * 16, duration: 1.1, overwrite: "auto" });
        });

        const onLeave = contextSafe(() => {
          rotY(0);
          rotX(0);
        });

        stageEl.addEventListener("mousemove", onMove);
        stageEl.addEventListener("mouseleave", onLeave);

        Observer.create({
          target: stageEl,
          type: "touch,pointer",
          dragMinimum: 28,
          onDragEnd: (self) => {
            if (Math.abs(self.deltaX) < 28) return;
            go(self.deltaX < 0 ? activeRef.current + 1 : activeRef.current - 1);
          },
        });

        return () => {
          stageEl.removeEventListener("mousemove", onMove);
          stageEl.removeEventListener("mouseleave", onLeave);
        };
      }
    },
    { dependencies: [ready, reduced], scope: root },
  );

  useEffect(() => {
    if (!ready || reduced) return;
    const stageEl = stage.current;
    let paused = false;
    const id = window.setInterval(() => {
      if (!paused) go(activeRef.current + 1);
    }, 4200);
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    stageEl?.addEventListener("pointerenter", pause);
    stageEl?.addEventListener("pointerleave", resume);
    return () => {
      window.clearInterval(id);
      stageEl?.removeEventListener("pointerenter", pause);
      stageEl?.removeEventListener("pointerleave", resume);
    };
  }, [go, ready, reduced]);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24"
    >
      <svg className="hero-rings" viewBox="0 0 1000 1000" aria-hidden>
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cx="500" cy="500" r={36 + i * 38} />
        ))}
      </svg>

      <div className="hero-parallax relative z-10 flex min-h-0 flex-1 flex-col">
      <div className="hero-announcement relative z-10 mx-auto mt-2 w-[min(92vw,1440px)] px-4 md:px-8">
        <a
          href={site.bookUrl}
          className="inline-flex items-center gap-3 rounded-full border border-gold/25 bg-leather/60 px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-gold-soft uppercase backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-chrome" />
          {site.announcement}
        </a>
      </div>

      <div className="relative z-10 mx-auto grid min-h-0 w-[min(92vw,1440px)] flex-1 grid-cols-1 items-center gap-8 px-4 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-8 md:gap-4">
        <div className="hero-copy">
          <p className="font-mono text-[11px] tracking-[0.3em] text-chrome uppercase">
            {site.locationLine} · {site.shop}
          </p>
          <h1 className="hero-title font-display mt-5 max-w-[10ch] text-[clamp(3.4rem,9vw,7.4rem)] leading-[0.86] text-bone uppercase">
            Modern & classic men’s haircuts
          </h1>
          <p className="hero-lead mt-6 max-w-md text-[15px] leading-relaxed text-mute md:text-base">
            Precision fades, clean tapers, scissor cuts, and beard grooming in
            North Loop Minneapolis. Every sit-down starts with a consultation —
            then the details.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href={site.bookUrl} className="btn-gold hero-cta">
                Book appointment
              </a>
            </Magnetic>
            <button
              type="button"
              className="btn-ghost hero-cta"
              onClick={() => {
                const services = document.querySelector("#services");
                if (services && lenis) {
                  lenis.scrollTo(services as HTMLElement, { offset: 0 });
                } else {
                  services?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              See the work
            </button>
          </div>
        </div>

        <div className="hero-stage-wrap relative h-[58vw] min-h-[320px] max-h-[620px] md:h-[62vh]">
          <div
            ref={stage}
            className="hero-stage relative h-full w-full"
            data-cursor="hover"
            role="region"
            aria-roledescription="carousel"
            aria-label="Haircut gallery"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {heroSlides.map((slide, index) => (
                <article
                  key={slide.src}
                    className="cf-card absolute aspect-[3/4] w-[min(52vw,300px)] overflow-hidden rounded-[28px] border border-white/10 bg-panel shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:w-[min(36vw,400px)]"
                >
                    <img
                    src={slide.src}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                    draggable={false}
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 to-transparent p-5">
                    <p className="font-mono text-[10px] tracking-[0.28em] text-gold uppercase">
                      {String(index + 1).padStart(2, "0")} · {slide.label}
                    </p>
                  </div>
                </article>
              ))}
              <div ref={blade} className="blade left-0 opacity-0" />
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 z-10 flex items-center justify-between px-1">
            <div className="flex gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  aria-current={index === active ? true : undefined}
                  className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-gold" : "w-2 bg-white/25"}`}
                  onClick={() => go(index)}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn-ghost !px-3 !py-2"
                aria-label="Previous cut"
                onClick={() => go(active - 1)}
              >
                ←
              </button>
              <button
                type="button"
                className="btn-ghost !px-3 !py-2"
                aria-label="Next cut"
                onClick={() => go(active + 1)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-6 flex w-[min(92vw,1440px)] items-end justify-between px-4 md:px-8">
        <p className="font-mono text-[10px] tracking-[0.24em] text-mute uppercase">
          {site.tagline}
        </p>
        <p className="hero-scroll-cue hidden font-mono text-[10px] tracking-[0.24em] text-mute uppercase md:block">
          Scroll
        </p>
      </div>
      </div>
    </section>
  );
}
