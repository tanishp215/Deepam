"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",        label: "Home"    },
  { href: "/temples", label: "Explore" },
  { href: "/about",   label: "About"   },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0D0A07]/90 backdrop-blur-md border-b border-[rgba(249,115,22,0.12)]"
            : "bg-transparent"
        }`}
        style={{ height: "68px" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-[#FAFAF9] tracking-tight">
            Deepam
          </Link>

          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-[#F97316]"
                style={{
                  fontSize: "17px",
                  fontWeight: 400,
                  color: pathname === link.href ? "#F97316" : "#A8A29E",
                  padding: "13px 34px 13px 0",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex">
            <Link href="/temples" className="btn-primary">
              Find Temples
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#A8A29E] hover:text-[#FAFAF9] transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 3l16 16M19 3L3 19" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h16M3 11h16M3 16h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ top: "68px" }}>
          <div className="absolute inset-0 bg-[#0D0A07]/95 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
          <div className="relative z-10 flex flex-col px-6 border-t border-[rgba(249,115,22,0.1)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-4 border-b border-[rgba(249,115,22,0.08)] text-[#FAFAF9] font-medium hover:text-[#F97316] transition-colors"
                style={{ fontSize: "17px" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link href="/temples" className="btn-primary w-full justify-center">
                Find Temples
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
