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
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1100] transition-colors duration-300"
        style={{
          height: "68px",
          background: "rgba(244,239,230,0.85)",
          backdropFilter: "saturate(110%) blur(8px)",
          WebkitBackdropFilter: "saturate(110%) blur(8px)",
          boxShadow: "0 1px 0 rgba(164,113,72,0.35)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8">

          {/* Wordmark — Fraunces italic with diya glyph replacing the period */}
          <Link
            href="/"
            className="flex items-baseline shrink-0"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--ink)",
              letterSpacing: "-0.01em",
              textDecoration: "none",
            }}
          >
            Deepam
            <img
              src="/marks/diya.svg"
              alt=""
              aria-hidden="true"
              style={{ width: "7px", height: "7px", marginLeft: "2px", verticalAlign: "baseline", opacity: 0.8 }}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: active ? "var(--ink)" : "var(--ink-muted)",
                    textDecoration: active ? "underline" : "none",
                    textDecorationColor: "var(--oxblood)",
                    textUnderlineOffset: "6px",
                    textDecorationThickness: "1px",
                    transition: "color 0.15s ease",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA — 1px oxblood outline, no fill */}
          <div className="hidden md:flex shrink-0">
            <Link
              href="/temples"
              className="nav-cta"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--oxblood)",
                border: "1px solid var(--oxblood)",
                borderRadius: "2px",
                padding: "7px 16px",
                letterSpacing: "0.01em",
                lineHeight: 1,
                textDecoration: "none",
                transition: "background 0.15s ease, color 0.15s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--oxblood)";
                el.style.color = "var(--paper)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "var(--oxblood)";
              }}
            >
              Read the dispatches
            </Link>
          </div>

          {/* Mobile toggle — no Lucide, plain unicode */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "22px",
              color: "var(--ink-muted)",
              lineHeight: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[1099] md:hidden"
          style={{
            top: "68px",
            background: "rgba(244,239,230,0.97)",
            backdropFilter: "saturate(110%) blur(12px)",
            WebkitBackdropFilter: "saturate(110%) blur(12px)",
          }}
        >
          <div className="flex flex-col px-6 pt-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "17px",
                    fontWeight: 500,
                    color: active ? "var(--ink)" : "var(--ink-soft)",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(164,113,72,0.18)",
                    letterSpacing: "0.01em",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-6">
              <Link
                href="/temples"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--oxblood)",
                  border: "1px solid var(--oxblood)",
                  borderRadius: "2px",
                  padding: "10px 20px",
                  letterSpacing: "0.01em",
                  textDecoration: "none",
                }}
              >
                Read the dispatches
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
