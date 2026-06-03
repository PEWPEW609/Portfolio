import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin client-side (registerPlugin is idempotent).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Framer-Motion-quality easing curve, reused across GSAP tweens.
export const EASE = "expo.out";
export const EASE_INOUT = "power4.inOut";

export { gsap, ScrollTrigger };
