// Small floating attribution badge, mirroring the original's bottom-right pill.
export default function FramerBadge() {
  return (
    <a
      href="https://www.framer.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Made in Framer"
      className="fixed bottom-4 right-4 z-30 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium text-black shadow-[0_2px_12px_rgba(0,0,0,0.12)] ring-1 ring-black/5 backdrop-blur transition-transform duration-300 hover:scale-105"
    >
      <svg viewBox="0 0 14 21" className="h-3 w-3" fill="currentColor" aria-hidden="true">
        <path d="M0 0h14v7H7zM0 7h7l7 7H7v7l-7-7z" />
      </svg>
      Made in Framer
    </a>
  );
}
