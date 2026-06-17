import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--paper)",
      borderTop: "1px solid rgba(201,184,122,0.12)",
    }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">

          {/* Brand */}
          <div>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "20px",
              fontWeight: 400,
              color: "var(--ink)",
              marginBottom: "8px",
              display: "flex",
              alignItems: "baseline",
              gap: "2px",
            }}>
              Deepam
              <img
                src="/marks/diya.svg"
                alt=""
                aria-hidden="true"
                style={{ width: "10px", height: "10px", verticalAlign: "baseline", opacity: 0.75 }}
              />
            </p>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "14px",
              color: "var(--ink-muted)",
              lineHeight: 1.5,
              maxWidth: "30ch",
              marginBottom: "8px",
            }}>
              A ledger of lamps in the South Asian diaspora.
            </p>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--ink-faint)",
              letterSpacing: "0.04em",
            }}>
              Deepam (Tamil): a lamp.
            </p>
          </div>

          {/* Platform nav */}
          <div>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              fontVariant: "small-caps",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--brass)",
              marginBottom: "16px",
            }}>
              Platform
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { href: "/",                  label: "Home"            },
                { href: "/temples",           label: "Explore Temples" },
                { href: "/about",             label: "About Deepam"    },
                { href: "/about#methodology", label: "Methodology"     },
                { href: "/map",               label: "The Map"         },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: "10px" }}>
                  <Link
                    href={link.href}
                    className="footer-link"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      color: "var(--ink-soft)",
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              fontVariant: "small-caps",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--brass)",
              marginBottom: "16px",
            }}>
              Community
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { href: "mailto:tanishchess@gmail.com", label: "Contact the Project",          external: true  },
                { href: "/about#partner",               label: "Temple Partnership (Tier 2)",  external: false },
                { href: "/about#removal",               label: "Removal Request",              external: false },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: "10px" }}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        color: "var(--ink-soft)",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                      }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        color: "var(--ink-soft)",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom strip */}
        <hr className="rule-brass" style={{ marginBottom: "16px" }} />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          className="sm:flex-row sm:justify-between"
        >
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--ink-faint)",
            letterSpacing: "0.04em",
          }}>
            © 2026 Deepam · All data is public Tier 1 signal · Model estimates carry uncertainty.
          </p>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--ink-faint)",
            letterSpacing: "0.04em",
          }}>
            Temple boards may request removal at any time.
          </p>
        </div>
      </div>

      {/* Hover style for footer links */}
      <style>{`
        .footer-link:hover { color: var(--oxblood) !important; }
      `}</style>
    </footer>
  );
}
