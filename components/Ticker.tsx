"use client";

// Infinite horizontal marquee of the word "Architecture".
export default function Ticker() {
  const items = Array.from({ length: 8 });

  return (
    <section className="overflow-hidden border-y border-black/10 bg-paper py-8 md:py-12">
      <div className="flex w-max animate-ticker">
        {/* Two identical halves so the -50% translate loops seamlessly */}
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
            {items.map((_, i) => (
              <span key={i} className="flex shrink-0 items-center">
                <span className="px-8 text-[7vw] font-medium uppercase leading-none tracking-[-0.04em] md:text-[clamp(48px,7vw,120px)]">
                  Architecture
                </span>
                <span className="text-[2vw] md:text-3xl">&#10038;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
