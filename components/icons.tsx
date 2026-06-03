import type { SVGProps } from "react";

// Diagonal "go to" arrow (↗) used on project / publication cards and links.
export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

// Downward arrow used by the "Scroll to Discover" hint.
export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 5v14" />
      <path d="M5 12l7 7 7-7" />
    </svg>
  );
}
