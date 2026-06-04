import { publications } from "@/lib/content";
import { ArrowUpRight } from "./icons";
import Reveal from "./anim/Reveal";

export default function PublicationsTable() {
  return (
    <section className="bg-paper px-6 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-site">
        {/* Header row */}
        <Reveal className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-black pb-4 md:grid-cols-[1fr_auto_40px]">
          <span className="mono-label text-neutral-500">Title</span>
          <span className="mono-label text-right text-neutral-500 md:text-left">Year</span>
          <span className="hidden md:block" />
        </Reveal>

        {/* Book rows */}
        <ul>
          {publications.map((pub, i) => (
            <Reveal as="li" key={`${pub.title}-${i}`} y={18} duration={0.7}>
              <a
                href="https://favoritframe.lemonsqueezy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-black/10 py-5 transition-colors duration-300 hover:bg-black hover:text-white md:grid-cols-[1fr_auto_40px] md:py-6"
                data-cursor
              >
                <span className="flex items-center gap-3 text-lg font-medium tracking-tight md:text-[22px]">
                  <ArrowUpRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  <span className="-ml-7 transition-all duration-300 group-hover:ml-0">
                    {pub.title}
                  </span>
                </span>
                <span className="mono-label text-right text-neutral-500 group-hover:text-white/70 md:text-left">
                  {pub.year}
                </span>
                <span className="hidden justify-self-end md:flex">
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
