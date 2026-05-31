"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, MapPin } from "@phosphor-icons/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/temples", label: "Explore Temples" },
  { href: "/about", label: "About Deepam" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0D0A07]/90 backdrop-blur-md border-b border-[rgba(249,115,22,0.12)]"
            : "bg-transparent"
        }`}
        style={{ height: "64px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Deepam lamp icon */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div
                className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"
                style={{
                  boxShadow:
                    "0 0 8px rgba(245,158,11,0.8), 0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.15)",
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
                }}
              />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight text-[#FAFAF9] group-hover:text-[#FCD34D] transition-colors duration-200">
              Deepam
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  pathname === link.href
                    ? "text-[#F97316] bg-[rgba(249,115,22,0.08)]"
                    : "text-[#A8A29E] hover:text-[#FAFAF9] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/temples"
              className="btn-saffron flex items-center gap-2 cursor-pointer"
            >
              <MapPin weight="fill" size={14} />
              Find Temples
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-[#A8A29E] hover:text-[#FAFAF9] hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ top: "64px" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0D0A07]/95 backdrop-blur-md"
            onClick={() => setMenuOpen(false)}
          />
          {/* Menu content */}
          <div className="relative z-10 flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer ${
                  pathname === link.href
                    ? "text-[#F97316] bg-[rgba(249,115,22,0.1)]"
                    : "text-[#D6D3D1] hover:text-[#FAFAF9] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4">
              <Link
                href="/temples"
                className="btn-saffron flex items-center justify-center gap-2 w-full cursor-pointer"
              >
                <MapPin weight="fill" size={14} />
                Find Temples
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
