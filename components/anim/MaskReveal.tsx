"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Scroll-linked image panel: a clip-path wipe reveals the content from the
// bottom upward while the inner content parallax-zooms from 1.2x to 1x.
// Pass the positioning/aspect classes via `className`; children should fill it.
export default function MaskReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelector<HTMLElement>("[data-parallax]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 88%", end: "top 42%", scrub: true },
        }
      );
      if (inner) {
        gsap.fromTo(
          inner,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 88%", end: "top 28%", scrub: true },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div data-parallax className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
