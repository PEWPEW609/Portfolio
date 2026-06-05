"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const WORD_CLASS =
  "select-none whitespace-nowrap text-center font-semibold uppercase leading-[0.8] text-white";
const WORD_STYLE = {
  fontSize: "clamp(56px, 19vw, 360px)",
  letterSpacing: "-0.13em",
} as const;

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Hold the latest onComplete in a ref so the intro effect runs exactly once.
  // The parent passes a fresh callback when `loaded` flips; depending on it
  // would re-run the effect mid-animation and replay the whole loader.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (prefersReducedMotion()) {
      onCompleteRef.current();
      setHidden(true); // no animation — remove the overlay immediately
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline();

      // GSAP owns every transform on the words (avoids CSS/GSAP conflicts).
      // Reveal the masked stack and park "Design" below the mask to start.
      tl.set(".loader-words", { autoAlpha: 1 }, 0);
      tl.set(".loader-word-2", { yPercent: 120 }, 0);

      // Count 000 -> 100
      tl.to(counter, {
        v: 100,
        duration: 2.6,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
      }, 0);

      // Progress line draws across
      tl.fromTo(".loader-bar", { scaleX: 0 }, {
        scaleX: 1,
        duration: 2.6,
        ease: "power2.inOut",
      }, 0);

      // 1. "Discover" rises in and holds
      tl.from(".loader-word-1", {
        yPercent: 120,
        duration: 0.8,
        ease: "expo.out",
      }, 0.2);

      // 2. "Discover" fully slides up and clears the mask...
      tl.to(".loader-word-1", {
        yPercent: -120,
        duration: 0.55,
        ease: "power3.inOut",
      }, 1.4);

      // 3. ...only THEN does "Design" rise in (sequential, never overlapping)
      tl.to(".loader-word-2", {
        yPercent: 0,
        duration: 0.65,
        ease: "expo.out",
      }, 1.95);

      // "Design" + meta exit upward, then the curtain lifts to reveal the page.
      tl.to([".loader-word-2", ".loader-meta"], {
        yPercent: -120,
        duration: 0.6,
        ease: "power3.in",
        stagger: 0.04,
      }, 3.0);

      tl.to(root.current, {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut",
        // Release scroll + trigger hero reveal as the curtain starts lifting.
        onStart: () => onCompleteRef.current(),
      }, 3.2);

      tl.set(root.current, { display: "none" });
      tl.call(() => setHidden(true));
    }, root);

    return () => ctx.revert();
    // Run once on mount — onComplete is read through a ref (see above).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={root}
      data-loader
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black px-6 py-6 text-white md:px-10 md:py-8"
    >
      <div className="flex items-center justify-between">
        <span className="loader-meta mono-label text-white/60">Ian Pereira</span>
        <span className="loader-meta mono-label text-white/60">
          {String(count).padStart(3, "0")}
        </span>
      </div>

      {/* Masked word stack: Discover → Design (opacity-0 until GSAP reveals) */}
      <div className="loader-words relative overflow-hidden opacity-0">
        <h1 className={`loader-word-1 ${WORD_CLASS}`} style={WORD_STYLE}>
          Discover
        </h1>
        <h1
          className={`loader-word-2 ${WORD_CLASS} absolute inset-0`}
          style={WORD_STYLE}
        >
          Design
        </h1>
      </div>

      <div className="flex items-center justify-between">
        <span className="loader-meta mono-label text-white/40">Loading</span>
        <div className="loader-bar h-px w-1/2 origin-left bg-white/40" />
      </div>
    </div>
  );
}
