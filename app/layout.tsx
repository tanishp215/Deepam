import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono, Mukta } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-deva",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepam — Finding the temples that need us",
  description:
    "A community platform identifying diaspora Hindu temples in North Carolina that may benefit from increased support, before they are forced into ritual concessions.",
  keywords: ["Hindu temple", "North Carolina", "diaspora", "community support", "Deepam"],
  openGraph: {
    title: "Deepam",
    description: "Finding the temples that need us",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrains.variable} ${mukta.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* §4.1 — paper grain overlay (Stripe Press technique) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.06] mix-blend-multiply"
        >
          <filter id="paper-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-grain)" />
        </svg>

        {/* §4.4 — duotone filter definition (referenced by .tinted class) */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <filter id="duotone-paper">
            <feColorMatrix
              type="matrix"
              values="0.92 0.05 0.03 0 0
                      0.78 0.10 0.05 0 0
                      0.55 0.08 0.03 0 0
                      0    0    0    1 0"
            />
          </filter>
        </svg>

        {children}
      </body>
    </html>
  );
}
