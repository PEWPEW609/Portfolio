import type { Metadata } from "next";
import { Inter, Martian_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FF Architect — Portfolio Template",
  description:
    "Facade Architects — a prestigious architectural firm crafting highly personalized homes where minimalism meets functionality.",
  metadataBase: new URL("https://ff-architect.example.com"),
  openGraph: {
    title: "FF Architect — Portfolio Template",
    description:
      "Facade Architects — crafting highly personalized homes where minimalism meets functionality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${martianMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
