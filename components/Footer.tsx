import Reveal from "./anim/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-paper">
      {/* Credits bar */}
      <div className="mx-auto max-w-site px-6 md:px-10">
        <Reveal className="flex flex-col gap-3 border-t border-black/10 py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <p className="mono-label text-neutral-500">
            © 2026 Facade Architects
          </p>
          <p className="mono-label text-neutral-500">
            Template by{" "}
            <a
              href="https://www.favoritframe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline-offset-4 transition-opacity hover:opacity-60"
              data-cursor
            >
              Favorit × Frame
            </a>
          </p>
        </Reveal>
      </div>

      {/* Oversized closing wordmark */}
      <Reveal className="px-6 md:px-10" y={48} duration={1.3}>
        <h2
          className="select-none text-center font-semibold uppercase leading-[0.78] tracking-tightest text-black"
          style={{ fontSize: "clamp(80px, 29vw, 600px)", letterSpacing: "-0.13em" }}
        >
          Facade
        </h2>
      </Reveal>
    </footer>
  );
}
