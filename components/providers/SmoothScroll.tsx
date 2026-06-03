"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Loader from "@/components/Loader";

type AppContextValue = { loaded: boolean };
const AppContext = createContext<AppContextValue>({ loaded: false });
export const useApp = () => useContext(AppContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Start at the top — no scroll restoration interfering with the intro.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Lenis smooth scroll wired into the GSAP ticker + ScrollTrigger.
  useEffect(() => {
    if (prefersReducedMotion()) {
      setLoaded(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      // Buttery exponential ease-out for premium inertia.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }
    lenis.stop(); // locked until the loader finishes

    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Release scroll once the loader lifts.
  useEffect(() => {
    if (!loaded) return;
    lenisRef.current?.start();
    // Layout (pins/spacers) settles after reveal — recalc trigger positions.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [loaded]);

  return (
    <AppContext.Provider value={{ loaded }}>
      <Loader onComplete={() => setLoaded(true)} />
      {children}
    </AppContext.Provider>
  );
}
