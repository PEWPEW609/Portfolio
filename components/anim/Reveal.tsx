"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** upward travel distance in px */
  y?: number;
  delay?: number;
  duration?: number;
  /** when > 0, animate descendant [data-reveal-item] elements with this stagger */
  stagger?: number;
  start?: string;
};

// Fade + gentle upward motion on scroll into view. Targets itself, or its
// [data-reveal-item] descendants when `stagger` is set.
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 28,
  delay = 0,
  duration = 1.1,
  stagger = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const targets =
      stagger > 0
        ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"))
        : [el];
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, stagger, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
