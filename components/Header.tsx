"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/content";

const easeFramer = [0.44, 0, 0.07, 1] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the menu overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mix-blend-difference text-white">
          <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
            <Link
              href="/"
              className="text-[15px] font-medium tracking-tight md:text-base"
              onClick={() => setOpen(false)}
            >
              FF Architect
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="mono-label cursor-pointer text-[12px] uppercase tracking-[0.04em]"
              aria-expanded={open}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeFramer }}
            className="fixed inset-0 z-40 bg-black text-white"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
              }}
              className="flex h-full flex-col justify-center px-6 md:px-10"
            >
              <ul className="space-y-1 md:space-y-2">
                {[
                  { label: "Index", href: "/" },
                  { label: "Projects", href: "/#projects" },
                  { label: "Catalogue", href: "https://favoritframe.lemonsqueezy.com/" },
                ].map((item) => (
                  <MenuLine key={item.label} onClick={() => setOpen(false)}>
                    <Link
                      href={item.href}
                      className="block w-fit text-[13vw] font-medium uppercase leading-[0.95] tracking-[-0.05em] transition-opacity hover:opacity-60 md:text-[7vw]"
                    >
                      {item.label}
                    </Link>
                  </MenuLine>
                ))}
              </ul>

              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-2 border-t border-white/15 pt-8 md:mt-16 md:max-w-2xl">
                {projects.map((p) => (
                  <MenuLine key={p.href} onClick={() => setOpen(false)}>
                    <Link
                      href={p.href}
                      className="mono-label inline-flex items-center gap-2 text-[12px] text-white/70 transition-colors hover:text-white"
                    >
                      {p.title}
                    </Link>
                  </MenuLine>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuLine({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.li
      variants={{
        hidden: { y: 40, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeFramer } },
      }}
      onClick={onClick}
    >
      {children}
    </motion.li>
  );
}
