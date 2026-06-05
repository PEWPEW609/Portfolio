import Image from "next/image";
import Link from "next/link";
import { intro } from "@/lib/content";
import { ArrowUpRight } from "./icons";
import Reveal from "./anim/Reveal";
import MaskReveal from "./anim/MaskReveal";

export default function Intro() {
  return (
    <section className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-site">
        {/* Centered feature image */}
        <div className="mx-auto w-full max-w-[440px]">
          <MaskReveal className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
            <Image
              src={intro.image}
              alt="Interior architecture by Ian Pereira"
              fill
              sizes="(max-width: 768px) 90vw, 440px"
              className="object-cover grayscale"
            />
          </MaskReveal>
        </div>

        {/* Label row + divider */}
        <Reveal className="mt-12 flex items-end justify-between gap-4 border-b border-black/20 pb-5 md:mt-20">
          <span className="mono-label text-black">{intro.label}</span>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-1.5"
            data-cursor
          >
            <span className="mono-label text-black transition-opacity duration-300 group-hover:opacity-60">
              {intro.cta}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        {/* Body copy — offset to the right column */}
        <div className="mt-10 grid grid-cols-1 md:mt-14 md:grid-cols-12">
          <div className="space-y-5 md:col-span-6 md:col-start-7">
            {intro.paragraphs.map((paragraph, i) => (
              <Reveal
                as="p"
                key={i}
                y={20}
                delay={i * 0.06}
                className="text-[clamp(17px,1.5vw,21px)] leading-[1.5] tracking-[-0.01em] text-black"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
