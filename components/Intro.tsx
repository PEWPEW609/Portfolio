"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { intro } from "@/lib/content";
import { ArrowUpRight } from "./icons";

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = intro.body.split(" ");

  return (
    <section className="bg-paper px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-site">
        <div className="mb-10 flex items-center gap-2 md:mb-16">
          <span className="h-1.5 w-1.5 rounded-full bg-black" />
          <span className="mono-label">{intro.eyebrow}</span>
        </div>

        <div ref={ref}>
          <p className="max-w-[20ch] text-[8.5vw] font-medium leading-[1.05] tracking-[-0.03em] text-black sm:max-w-none sm:text-[clamp(28px,4vw,56px)]">
            {words.map((word, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              >
                {word}
              </Word>
            ))}
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-white transition-colors duration-300 hover:bg-neutral-800"
          >
            <span className="mono-label text-white">Explore Projects</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
      {" "}
    </motion.span>
  );
}
