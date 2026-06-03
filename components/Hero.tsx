"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "./icons";

const easeFramer = [0.44, 0, 0.07, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: the big title drifts up faster than the cut-out building,
  // creating depth as the hero scrolls away.
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const houseY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-[#cfd0cf]"
    >
      {/* Layer 0 — full background photograph (house + sky) */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 origin-bottom"
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Minimalist timber house standing in an open coastal field"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </motion.div>

      {/* Layer 1 — the giant FACADE wordmark, sandwiched between sky and house */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="absolute inset-x-0 top-[34%] z-10 flex justify-center md:top-[30%]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeFramer, delay: 0.1 }}
          className="select-none text-center font-sans font-semibold uppercase leading-[1] text-[#1c1c1c]"
          style={{
            fontSize: "clamp(60px, 29vw, 600px)",
            letterSpacing: "-0.13em",
          }}
        >
          Facade
        </motion.h1>
      </motion.div>

      {/* Layer 2 — transparent cut-out of the same house (sky removed) sits
          in front of the wordmark so the building occludes the letters */}
      <motion.div
        style={{ y: houseY }}
        className="pointer-events-none absolute inset-0 z-20"
      >
        <Image
          src="/images/hero-house.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute inset-x-0 bottom-6 z-30 flex justify-center md:bottom-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mono-label flex items-center gap-2 text-[#1c1c1c]"
        >
          <span>Scroll to Discover</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
