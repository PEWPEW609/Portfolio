"use client";

import { useEffect, useRef } from "react";

// Subtle two-part cursor: an instant dot + a lerp-following ring that grows
// over interactive elements. Disabled on touch and for reduced-motion users.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dotEl = dot.current!;
    const ringEl = ring.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dotEl.style.transform = `translate(${mx}px, ${my}px)`;
      if (!shown) {
        shown = true;
        dotEl.style.opacity = "1";
        ringEl.style.opacity = "1";
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ringEl.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      ringEl.classList.toggle(
        "cursor-grow",
        !!t?.closest("a, button, [data-cursor]")
      );
    };

    const onLeave = () => {
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
      shown = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
