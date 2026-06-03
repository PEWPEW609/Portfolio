import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, client-side only.
if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Framer-Motion-quality easing curve, reused across GSAP tweens.
export const EASE = "expo.out";
export const EASE_INOUT = "power4.inOut";

export { gsap, ScrollTrigger };
