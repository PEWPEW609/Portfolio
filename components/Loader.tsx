"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      setHidden(true); // no animation — remove the overlay immediately
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline();

      // Count 000 -> 100
      tl.to(counter, {
        v: 100,
        duration: 1.7,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
      }, 0);

      // Wordmark rises into view
      tl.from(".loader-word", {
        yPercent: 120,
        duration: 1.1,
        ease: "expo.out",
      }, 0.15);

      // Progress line draws across
      tl.fromTo(".loader-bar", { scaleX: 0 }, {
        scaleX: 1,
        duration: 1.7,
        ease: "power2.inOut",
      }, 0);

      // Meta + word exit upward, then the curtain lifts to reveal the page.
      tl.to([".loader-word", ".loader-meta"], {
        yPercent: -120,
        duration: 0.7,
        ease: "power3.in",
        stagger: 0.04,
      }, 2.0);

      tl.to(root.current, {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut",
        // Release scroll + trigger hero reveal as the curtain starts lifting.
        onStart: onComplete,
      }, 2.2);

      tl.set(root.current, { display: "none" });
      tl.call(() => setHidden(true));
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black px-6 py-6 text-white md:px-10 md:py-8"
    >
      <div className="flex items-center justify-between">
        <span className="loader-meta mono-label text-white/60">FF Architect</span>
        <span className="loader-meta mono-label text-white/60">
          {String(count).padStart(3, "0")}
        </span>
      </div>

      <div className="overflow-hidden">
        <h1
          className="loader-word select-none text-center font-semibold uppercase leading-[0.8] text-white"
          style={{ fontSize: "clamp(80px, 26vw, 460px)", letterSpacing: "-0.13em" }}
        >
          Facade
        </h1>
      </div>

      <div className="flex items-center justify-between">
        <span className="loader-meta mono-label text-white/40">Loading</span>
        <div className="loader-bar h-px w-1/2 origin-left bg-white/40" />
      </div>
    </div>
  );
}
