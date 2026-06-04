import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/lib/content";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Projects — FF Architect",
};

export default function ProjectsPage() {
  return (
    <main className="relative bg-paper">
      <Header />

      <section className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-site">
          <div className="mb-12 flex items-center gap-2 md:mb-20">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span className="mono-label">Selected Works</span>
          </div>

          <h1
            className="mb-16 font-semibold uppercase leading-[0.9] tracking-tightest md:mb-24"
            style={{ fontSize: "clamp(56px, 12vw, 220px)", letterSpacing: "-0.06em" }}
          >
            Projects
          </h1>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
            {projects.map((project, i) => (
              <Link
                key={project.href}
                href={project.href}
                className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <div className="relative aspect-[1.42] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-framer group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between md:mt-5">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mono-label mt-1 text-neutral-500">{project.location}</p>
                  </div>
                  <span className="mt-1 grid h-9 w-9 place-items-center rounded-full border border-black/15 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
