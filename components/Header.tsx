"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/content";
import { useApp } from "@/components/providers/SmoothScroll";

const easeFramer = [0.44, 0, 0.07, 1] as const;

/* ---------------------------------------------------------------------------
   Background-aware nav colour.
   Sample the luminance of whatever sits behind the header (solid section
   backgrounds via computed colour, photographs via a cached canvas) and pick
   black text over light backgrounds / white text over dark ones.
--------------------------------------------------------------------------- */

type Cache = { src: string; ctx: CanvasRenderingContext2D; sw: number; sh: number };
const imgCanvases = new WeakMap<HTMLImageElement, Cache>();

function getImgCanvas(img: HTMLImageElement): Cache | null {
  const existing = imgCanvases.get(img);
  if (existing && existing.src === img.currentSrc) return existing;
  if (!img.complete || !img.naturalWidth) return null;
  const sw = 100;
  const sh = Math.max(1, Math.round((100 * img.naturalHeight) / img.naturalWidth));
  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  try {
    ctx.drawImage(img, 0, 0, sw, sh);
  } catch {
    return null; // cross-origin / not yet decodable
  }
  const entry: Cache = { src: img.currentSrc, ctx, sw, sh };
  imgCanvases.set(img, entry);
  return entry;
}

function imgLuminanceAt(img: HTMLImageElement, x: number, y: number): number | null {
  const r = img.getBoundingClientRect();
  const nW = img.naturalWidth;
  const nH = img.naturalHeight;
  if (!r.width || !r.height || !nW) return null;

  // object-fit: cover mapping, honouring object-position
  const scale = Math.max(r.width / nW, r.height / nH);
  const dispW = nW * scale;
  const dispH = nH * scale;
  const op = getComputedStyle(img).objectPosition.split(" ");
  const posX = (parseFloat(op[0]) || 50) / 100;
  const posY = (parseFloat(op[1] ?? op[0]) || 50) / 100;
  const fx = (x - r.left - (r.width - dispW) * posX) / dispW;
  const fy = (y - r.top - (r.height - dispH) * posY) / dispH;
  if (fx < 0 || fx > 1 || fy < 0 || fy > 1) return null;

  const c = getImgCanvas(img);
  if (!c) return null;
  const sx = Math.min(c.sw - 1, Math.max(0, Math.round(fx * c.sw)));
  const sy = Math.min(c.sh - 1, Math.max(0, Math.round(fy * c.sh)));
  const d = c.ctx.getImageData(sx, sy, 1, 1).data;
  if (d[3] < 12) return null; // transparent pixel → keep looking behind
  return 0.299 * d[0] + 0.587 * d[1] + 0.114 * d[2];
}

function colorLuminance(bg: string): number | null {
  const m = bg.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(",").map((s) => parseFloat(s));
  if ((p[3] ?? 1) < 0.5) return null; // transparent → keep looking behind
  return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2];
}

function bgLuminanceAt(x: number, y: number): number | null {
  const stack = document.elementsFromPoint(x, y) as HTMLElement[];
  for (const el of stack) {
    if (el.closest("[data-site-header]")) continue;
    if (el.closest("[data-loader]")) continue; // ignore the intro overlay
    if (el.classList.contains("cursor-ring") || el.classList.contains("cursor-dot")) continue;
    if (el.tagName === "IMG") {
      const lum = imgLuminanceAt(el as HTMLImageElement, x, y);
      if (lum != null) return lum;
      continue;
    }
    const lum = colorLuminance(getComputedStyle(el).backgroundColor);
    if (lum != null) return lum;
  }
  return null;
}

export default function Header() {
  const { loaded } = useApp();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true); // white text by default (over the hero)

  // Lock scroll (Lenis + body) while the menu overlay is open.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { start: () => void; stop: () => void } }).__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Recolour the nav based on the background behind it.
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const y = 30;
      const w = window.innerWidth;
      let sum = 0;
      let n = 0;
      for (const x of [w * 0.08, w * 0.5, w * 0.92]) {
        const lum = bgLuminanceAt(x, y);
        if (lum != null) {
          sum += lum;
          n += 1;
        }
      }
      if (n > 0) setDark(sum / n < 140); // dark background → keep text white
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Re-check once fonts / pinned layout / images have settled.
    const t1 = setTimeout(compute, 500);
    const t2 = setTimeout(compute, 1600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // Re-run when the intro overlay lifts so the first sample sees real content.
  }, [loaded]);

  // Menu overlay is black, so force white text while it is open.
  const navWhite = open || dark;

  return (
    <>
      <header data-site-header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-colors duration-300 ${
            navWhite ? "text-white" : "text-black"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
            <Link
              href="/"
              className="text-[15px] font-medium tracking-tight md:text-base"
              onClick={() => setOpen(false)}
            >
              Ian Pereira
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
