import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content";
import { ArrowUpRight } from "./icons";
import Reveal from "./anim/Reveal";
import MaskReveal from "./anim/MaskReveal";

export default function Projects() {
  return (
    <section id="projects" className="bg-paper px-6 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto max-w-site">
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-x-8 md:gap-y-28">
          {projects.map((project, i) => (
            <Reveal
              key={project.href}
              y={40}
              // Editorial stagger: nudge the right-hand column downward.
              className={i % 2 === 1 ? "md:mt-28" : ""}
            >
              <Link href={project.href} className="group block" data-cursor>
                <MaskReveal className="relative aspect-[1.42] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-framer group-hover:scale-[1.04]"
                  />
                </MaskReveal>
                <div className="mt-4 flex items-start justify-between md:mt-5">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mono-label mt-1 text-neutral-500">
                      {project.location}
                    </p>
                  </div>
                  <span className="mt-1 grid h-9 w-9 place-items-center rounded-full border border-black/15 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex justify-center md:mt-28">
          <Link
            href="/projects"
            className="group inline-flex flex-col items-center"
            data-cursor
          >
            <span className="text-[7vw] font-medium uppercase leading-none tracking-[-0.04em] md:text-[clamp(40px,6vw,96px)]">
              See All Projects
            </span>
            <span className="mt-3 h-px w-full max-w-0 bg-black transition-all duration-500 ease-framer group-hover:max-w-full" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
