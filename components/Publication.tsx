import Image from "next/image";
import { ArrowUpRight } from "./icons";
import Reveal from "./anim/Reveal";
import MaskReveal from "./anim/MaskReveal";

export default function Publication() {
  return (
    <section className="bg-paper px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-site">
        <a
          href="https://favoritframe.lemonsqueezy.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-[16/10] w-full overflow-hidden bg-black md:aspect-[16/7]"
          data-cursor
        >
          <MaskReveal className="absolute inset-0">
            <Image
              src="/images/publication.jpg"
              alt="The Facade Catalogue — a set of architecture monographs on a concrete plinth"
              fill
              sizes="(max-width: 1680px) 100vw, 1680px"
              className="object-cover transition-transform duration-[1.4s] ease-framer group-hover:scale-[1.03]"
            />
          </MaskReveal>

          {/* Top-left label */}
          <Reveal className="absolute left-6 top-6 md:left-10 md:top-9" delay={0.2}>
            <span className="mono-label text-white/80">New Publication</span>
          </Reveal>

          {/* Bottom-left title + arrow */}
          <Reveal
            className="absolute inset-x-6 bottom-6 flex items-end justify-between md:inset-x-10 md:bottom-9"
            delay={0.3}
          >
            <h2 className="text-[10vw] font-medium uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[clamp(48px,7vw,110px)]">
              Facade
              <br />
              Catalogue
            </h2>
            <span className="mb-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black md:h-14 md:w-14">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Reveal>
        </a>
      </div>
    </section>
  );
}
