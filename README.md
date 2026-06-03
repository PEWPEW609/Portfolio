# Facade — FF Architect Clone

A pixel-faithful clone of the [FF Architect](https://ff-architect.framer.website/) ("Facade") architecture-portfolio template, rebuilt from scratch in **Next.js 15**, **Tailwind CSS**, and **Framer Motion**.

The original is a Framer site; this project recreates its layout, typography, motion, and assets as a hand-written React codebase.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS 3** — monochrome design tokens (`#000` / `#fff`)
- **Framer Motion 11** — scroll parallax, scroll-linked text reveal, staggered menu
- **next/font** — Inter / Inter Display (headings & body) + Martian Mono (labels)

## Highlights

- **Hero** — the signature "text-behind-object" depth effect: a full-bleed
  photograph, the giant `FACADE` wordmark, and a transparent cut-out of the same
  building stacked so the structure occludes the lower half of the letters.
  Parallax driven by `useScroll` / `useTransform`.
- **Intro** — scroll-linked word-by-word reveal (grey → black).
- **Projects** — editorial 2-column staggered grid with hover zoom.
- **Ticker** — infinite CSS marquee of "Architecture".
- **Publication** + **Publications table** — feature card and the catalogue listing.
- **Menu** — full-screen animated overlay with staggered links.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/
  layout.tsx          fonts + metadata
  page.tsx            home (assembles all sections)
  projects/page.tsx   "See All Projects" index
components/            Header, Hero, Intro, Projects, Ticker,
                       Publication, PublicationsTable, Footer, …
lib/content.ts         projects, publications, copy
public/images/         localized, web-optimized assets
```

## Notes

- All imagery is downscaled to web dimensions and served as WebP via the
  Next.js image pipeline.
- Content (studio name, project list, catalogue entries) is the original
  template's placeholder data, reproduced for layout fidelity.
