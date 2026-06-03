"use client";

import { motion } from "framer-motion";
import { publications } from "@/lib/content";
import { ArrowUpRight } from "./icons";

const easeFramer = [0.44, 0, 0.07, 1] as const;

export default function PublicationsTable() {
  return (
    <section className="bg-paper px-6 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-site">
        {/* Header row */}
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-black pb-4 md:grid-cols-[1.7fr_1.1fr_1.3fr_0.5fr_40px]">
          <span className="mono-label text-neutral-500">Title</span>
          <span className="mono-label hidden text-neutral-500 md:block">Author</span>
          <span className="mono-label hidden text-neutral-500 md:block">Publisher</span>
          <span className="mono-label text-right text-neutral-500 md:text-left">Year</span>
          <span className="hidden md:block" />
        </div>

        {/* Book rows */}
        <ul>
          {publications.map((pub, i) => (
            <motion.li
              key={`${pub.title}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, ease: easeFramer, delay: (i % 6) * 0.04 }}
            >
              <a
                href="https://favoritframe.lemonsqueezy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-black/10 py-5 transition-colors duration-300 hover:bg-black hover:text-white md:grid-cols-[1.7fr_1.1fr_1.3fr_0.5fr_40px] md:py-6"
              >
                <span className="flex items-center gap-3 text-lg font-medium tracking-tight md:text-[22px]">
                  <ArrowUpRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  <span className="-ml-7 transition-all duration-300 group-hover:ml-0">
                    {pub.title}
                  </span>
                </span>
                <span className="mono-label hidden text-neutral-500 group-hover:text-white/70 md:block">
                  {pub.author}
                </span>
                <span className="mono-label hidden text-neutral-500 group-hover:text-white/70 md:block">
                  {pub.publisher}
                </span>
                <span className="mono-label text-right text-neutral-500 group-hover:text-white/70 md:text-left">
                  {pub.year}
                </span>
                <span className="hidden justify-self-end md:flex">
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
