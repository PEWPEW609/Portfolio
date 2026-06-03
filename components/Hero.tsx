"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/providers/SmoothScroll";
import { ArrowDown } from "./icons";

export default function Hero() {
  const { loaded } = useApp();
  const section = useRef<HTMLElement>(null);

  // Pinned scroll timeline: the oversized wordmark scales down and slides up
  // while the photograph parallax-zooms behind it, then the hero releases.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = (end: string, titleScale: number, titleY: number) => () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        tl.to(".hero-title", { scale: titleScale, yPercent: titleY, ease: "none" }, 0)
          .to(".hero-house", { yPercent: -6, ease: "none" }, 0)
          .to(".hero-bg", { scale: 1.18, yPercent: -5, ease: "none" }, 0)
          .to(".hero-hint", { autoAlpha: 0, ease: "none" }, 0);
      };

      mm.add("(min-width: 768px)", build("+=120%", 0.46, -34));
      mm.add("(max-width: 767px)", build("+=80%", 0.6, -26));
    }, section);

    return () => ctx.revert();
  }, []);

  // Intro reveal, gated on the loader lifting. Targets inner elements only so
  // it never fights the pinned timeline's transforms on the outer layers.
  useEffect(() => {
    if (!loaded || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(".hero-title-inner", {
          yPercent: 18,
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
        })
        .from(
          ".hero-hint",
          { autoAlpha: 0, y: 14, duration: 1, ease: "power3.out" },
          "-=0.7"
        );
      // Positions can shift as the curtain releases — re-measure.
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      ref={section}
      className="relative h-[100svh] w-full overflow-hidden bg-[#cfd0cf]"
    >
      {/* Layer 0 — background photograph */}
      <div className="hero-bg absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-bg.jpg"
          alt="Minimalist timber house standing in an open coastal field"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 1 — gigantic cropped wordmark, bleeding off both edges */}
      <div className="hero-title absolute inset-0 z-10 flex items-center justify-center will-change-transform">
        <h1
          className="hero-title-inner select-none whitespace-nowrap text-center font-semibold uppercase leading-[0.8] text-[#191919]"
          style={{ fontSize: "clamp(120px, 44vw, 780px)", letterSpacing: "-0.13em" }}
        >
          Facade
        </h1>
      </div>

      {/* Layer 2 — transparent cut-out in front, completing the depth effect */}
      <div className="hero-house pointer-events-none absolute inset-0 z-20 will-change-transform">
        <Image
          src="/images/hero-house.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Scroll hint */}
      <div className="hero-hint absolute inset-x-0 bottom-6 z-30 flex justify-center md:bottom-8">
        <div className="mono-label flex items-center gap-2 text-[#191919]">
          <span>Scroll to Discover</span>
          <span className="hero-hint-arrow inline-flex">
            <ArrowDown className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </section>
  );
}
