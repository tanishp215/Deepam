import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-[#0D0A07] text-[#FAFAF9] antialiased">
        {children}
      </body>
    </html>
  );
}
