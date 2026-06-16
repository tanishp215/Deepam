import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono, Mukta } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  weight: ["300", "400", "500", "600"],
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
        {children}
      </body>
    </html>
  );
}
