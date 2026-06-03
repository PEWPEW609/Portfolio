"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { intro } from "@/lib/content";
import { ArrowUpRight } from "./icons";
import Reveal from "./anim/Reveal";

export default function Intro() {
  const para = useRef<HTMLParagraphElement>(null);
  const words = intro.body.split(" ");

  // Progressive word reveal: opacity scrubs from faint to solid as the
  // centered editorial paragraph passes through the viewport.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = para.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.6,
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 62%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-paper px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal className="mb-10 flex items-center justify-center gap-2 md:mb-16">
          <span className="h-1.5 w-1.5 rounded-full bg-black" />
          <span className="mono-label">{intro.eyebrow}</span>
        </Reveal>

        <p
          ref={para}
          className="text-[clamp(23px,3.3vw,42px)] font-medium leading-[1.18] tracking-[-0.02em] text-black"
        >
          {words.map((word, i) => (
            <span key={i}>
              <span data-word className="inline-block">
                {word}
              </span>{" "}
            </span>
          ))}
        </p>

        <Reveal className="mt-14 flex justify-center md:mt-20" delay={0.05}>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-white transition-colors duration-300 hover:bg-neutral-800"
            data-cursor
          >
            <span className="mono-label text-white">Explore Projects</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
