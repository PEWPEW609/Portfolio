import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#ffffff",
        muted: "rgba(153,153,153,0.6)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.13em",
      },
      maxWidth: {
        site: "1680px",
      },
      transitionTimingFunction: {
        framer: "cubic-bezier(0.44, 0, 0.07, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
