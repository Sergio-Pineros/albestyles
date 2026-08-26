"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP);

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    Observer,
    ScrollToPlugin,
    Flip,
  );
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  Observer,
  ScrollToPlugin,
  Flip,
};
