# Albe Styles — cinematic site spec

Hand-off for design and engineering. This document matches the implementation in this repo: a Next.js App Router site with GSAP + Lenis, using only real services, copy, and photos from albestylesbarber.com and `/imgs`.

## 1. Thesis

Albe’s current site is a static WordPress page: white canvas, gold outline button, concentric contour lines, logo, Instagram embed. The redesign keeps the **black / bone / gold** brand and the **mustache + crossed razors** mark, then treats the page like a night session in the chair: dark room, work as light, motion as the lineup.

**Signature:** a 3D coverflow of real cuts with a gold “blade wipe,” sitting on slowly rotating concentric rings (an evolution of the old contour-line background). Secondary signature: a pinned horizontal “tastes” reel — each service has its own motion language.

Do not default to luxury-serif cream, acid-green cyber, or newspaper chrome. Display type is industrial Midwest (`Big Shoulders Display`). The futuristic note is **clipper chrome** (`#6FDBD4`) against **cape gold** (`#C9A24A`).

## 2. Tokens

| Token | Hex | Role |
|---|---|---|
| Ink | `#080705` | Page ground (warm black, like the cape) |
| Leather | `#100E0B` | Panels, ticker, service reel |
| Panel | `#1A1712` | Cards |
| Bone | `#EDE6D6` | Primary type; About section ground |
| Gold | `#C9A24A` | Brand metal, CTAs, hairlines |
| Gold soft | `#E4C878` | Hover / highlight |
| Chrome | `#6FDBD4` | Interactive accent (blade catch-light) |
| Mute | `#9A9286` | Body secondary |

**Type**

- Display: Big Shoulders Display, 700–800, tracking `-0.04em`, tight leading `0.86–0.9`
- Body: Sora, 300–500, ~15px / 1.7
- Utility: IBM Plex Mono, 10–11px, tracking `0.22–0.3em`, uppercase (hours, indexes, CTAs)

**Layout:** max width 1440px. Section padding `clamp(4.5rem, 10vw, 8.5rem)` × `clamp(1.25rem, 4vw, 4.5rem)`. Radii 24–28px on media frames. Hairline gold/chrome gradient as the recurring “lineup” motif.

## 3. Sitemap (single page)

1. Preloader
2. Nav (fixed)
3. Hero `#top`
4. Ticker
5. Intro / craft `#work`
6. Services reel `#services` (5 tastes)
7. Gallery (detail studies)
8. Story `#story`
9. Reviews
10. Visit / book `#visit`
11. Footer

Booking CTA always points to the live scheduler: `https://albestylesbarber.com/book-final/`.

## 4. Content rules

Use only what exists on the current site or in `/imgs`:

- Services: Haircut, Beard Trim, Kids, Long/Medium, Packs
- Packages/prices from `/book-final/`
- Story from `/about/` (cook → painter → barber)
- Reviews from the homepage Google widget
- Address, hours, phone, email from `/contact/`
- Announcement in Albe’s voice: “New location — I’m waiting for you.”
- Location: SAVRON Barbershop & Lounge, 250 N 3rd Ave Suite #102
- Do not invent extra services, products, or stats

Copy is cleaned for typos (`Premiun`, `loock`, `appoinment`) without changing meaning.

## 5. Animation spec

Global engine: **GSAP 3** + **ScrollTrigger** + **SplitText** + **Observer** + **Lenis**. Animate **transform + opacity only**. `gsap.matchMedia()` for desktop/mobile and `prefers-reduced-motion`.

Defaults: duration `0.8`, ease `power3.out`. Scroll-linked motion uses `ease: "none"` + `scrub`.

### 5.1 Preloader — load

- Logo mark scales in (already on canvas).
- Count `00→100` + gold bar width.
- Wait for `document.fonts.ready` + hero images.
- Exit: brand fades up, panel `yPercent: -110`, `power4.inOut`, 0.9s.
- Reduced motion: skip, set ready immediately.

### 5.2 Cursor — pointer, desktop only

- Core follows mouse `duration: 0.12`.
- Ring lags `0.35`.
- Hover on `a, button, [data-cursor=hover]`: ring scale `1.85`.
- Hide on coarse pointers.

### 5.3 Nav — load + scroll + click

- After ready: fade/slide down 0.9s.
- ScrollY > 24: leather glass bar + gold border.
- Magnetic Book button (`gsap.quickTo` x/y, strength 0.32).
- Mobile overlay: links from `y: 40`. Lenis `scrollTo` on in-page anchors.

### 5.4 Hero — load, hover, drag, autoplay

**Concept:** coverflow of five real photos + rotating concentric rings + blade wipe.

| What | How | Trigger |
|---|---|---|
| Rings | Scale/fade in 1.4s, then `rotation: 360` / 120s infinite | Load |
| Title | SplitText chars, `yPercent: 120`, stagger 0.018, words masked | Load |
| Lead + CTAs | `y` + autoAlpha, stagger | Load +0.38s |
| Cards | From `z: -420`, stagger from center | Load |
| Stage tilt | `rotationY ±10`, `rotationX ±6` via `quickTo` | Mousemove |
| Rings parallax | `x/y` follow pointer, 1.1s | Mousemove |
| Coverflow layout | `x`, `z`, `rotateY`, `scale`, `brightness` | Active index change |
| Blade | 2px gold/chrome line, `xPercent -40→140`, 0.7s | Index change |
| Autoplay | +1 every 4.2s, pauses on pointer enter | Interval |
| Drag | Observer `touch,pointer`, `dragMinimum: 28` | Drag end |
| Dots / arrows | Direct index | Click |

Performance: `transform-style: preserve-3d`, `will-change` on cards, first image `fetchPriority=high`. No layout properties.

### 5.5 Ticker — ambient

- Duplicate row, `xPercent: -50`, 28s, `ease: none`, infinite.
- Pause not required. Reduced motion: static.

### 5.6 Intro — scroll enter

- Title chars rise from mask, trigger `top 72%`.
- Lineup bar `scaleX: 0→1`, origin left, 1.1s `power3.inOut`.
- Copy + four facts: `y: 28` stagger.

### 5.7 Services — scroll pin (desktop ≥900px)

Pin the section. Inner track `x` to `-(scrollWidth - vw)`, `ease: none`, `scrub: 1`. Nested cues use `containerAnimation` (required). Pin only the parent.

| Taste | Theme | Motion |
|---|---|---|
| Haircut | Fade | Image `clip-path inset(100%→0)` from the collar up, slight scale down |
| Beard Trim | Lineup | Gold vertical hairline `scaleY 0→1` over the cheek |
| Kids | Soft | Gentle `y` + `rotate ±2`, longer scrub |
| Long/Medium | Flow | Horizontal drift `xPercent -8→5` + scale 1.14→1 |
| Packs | Shop | Ken Burns scale 1.2→1 + saturate 0.55→1 |

Copy in each panel: `y/autoAlpha` when panel `left` hits `78%` of the container animation.

Mobile: stacked 100svh panels, fade-up on enter. No pin.

### 5.8 Gallery — scroll + hover

- Featured frame opens from inset clip + scale.
- Thumbs stagger in.
- Active image Ken Burns `scale 1→1.08` over 4.2s.
- Hover/click thumb swaps study (fade, lineup, flow, taper, chair) via `object-position` crops — same five photos, paced as details.

### 5.9 Story — scroll enter

- Portrait `clip-path inset(0 46% 0 46%)` → full (the lineup opening into a face), 1.4s `power4.inOut`.
- Title words masked.
- Body + Cook → Painter → Barber chips stagger.

Ground switches to **bone** so the page rhythm isn’t all-dark.

### 5.10 Reviews — scroll enter

- Cards `y: 48`, slight rotate, stagger 0.12. Horizontal swipe for overflow.

### 5.11 Visit — scroll scrub

- Shop photo (cape/logo) `scale 1.18→1` scrubbed to scroll.
- Info cards fade up.
- Package list is static typography (readable, bookable).

### 5.12 Micro-interactions (sitewide)

- Nav links: gold underline `background-size 0→100%`.
- Gold CTA: sheen sweep `::after` translateX.
- Ghost buttons: border/color to chrome.
- Focus: 2px chrome ring, 3px offset.
- Selection: gold on ink.

## 6. Implementation notes

- Next.js App Router, React 19, Tailwind v4, `next/font` (no render-blocking Google CSS).
- Client boundary: `MotionProvider` registers GSAP plugins once; sections use `useGSAP({ scope })`.
- Lenis: `gsap.ticker` drives `lenis.raf`; `lenis.on("scroll", ScrollTrigger.update)`; `lagSmoothing(0)`.
- After preloader `ready`, call `ScrollTrigger.refresh()`.
- Horizontal reel: **never** put ScrollTrigger on a child of a timeline; the pin/scrub lives on the track tween; panel cues use `containerAnimation`.
- Reduced motion: no Lenis, no coverflow autoplay, no pin reel, instant preloader, simple fades only.
- Assets in `/public/media`. Source files remain in `/imgs`.

## 7. Accessibility & performance

- Skip link to `#main`.
- Carousel has `aria-roledescription`, labels on dots/prev/next.
- `prefers-reduced-motion` honored via `gsap.matchMedia`.
- Grain overlay `pointer-events: none`; custom cursor disabled on touch.
- Animate compositor props only. One pin at a time. Pause hero autoplay when idle/hovered.
- LCP: hero first card + fonts via `next/font`.

## 8. Asset map

| File | Use |
|---|---|
| `logo-mark-white.png` | Preloader, footer |
| `logo-wordmark-white.png` | Nav |
| `albe-portrait.webp` | Story |
| `haircut.webp` | Hero, Haircut, gallery “fade” |
| `beard-trim.webp` | Hero, Beard, gallery “lineup” |
| `long-medium.webp` | Hero, Long/Medium, gallery “flow” |
| `kids.webp` | Hero, Kids, gallery “taper” |
| `packs.webp` | Hero, Packs, gallery “chair”, Visit background |

## 9. QA checklist

- [ ] Preloader completes with fonts + images, then hero intro plays once
- [ ] Coverflow drag, dots, arrows, autoplay, hover-pause
- [ ] Services pin + horizontal scrub on desktop; stacked on mobile
- [ ] Each service motion theme is distinct
- [ ] Gallery crop/pacing; About portrait slit-open
- [ ] Book buttons hit `/book-final/`
- [ ] Hours/address/phone match contact page
- [ ] Reduced motion: usable, no pin, no cursor, no autoplay
- [ ] Keyboard focus visible; skip link works
- [ ] 60fps on hero and pin reel (no width/height animation)
