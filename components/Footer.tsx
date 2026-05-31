import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(249,115,22,0.1)] bg-[#0D0A07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-2 h-2 rounded-full bg-[#F59E0B]"
                style={{
                  boxShadow:
                    "0 0 6px rgba(245,158,11,0.8), 0 0 16px rgba(245,158,11,0.4)",
                }}
              />
              <span className="font-display text-lg font-semibold text-[#FAFAF9]">
                Deepam
              </span>
            </div>
            <p className="text-sm text-[#A8A29E] leading-relaxed max-w-xs">
              A probabilistic framework for identifying community-supported
              diaspora temples under financial stress. Finding the lamps that
              need tending.
            </p>
            <p className="mt-4 text-xs text-[#57534E]">
              Deepam (Tamil): a lamp. Lamps need tending.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-[#57534E] tracking-widest uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/temples", label: "Explore Temples" },
                { href: "/about", label: "About Deepam" },
                { href: "/about#methodology", label: "Methodology" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#78716C] hover:text-[#F97316] transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Community */}
          <div>
            <h4 className="text-xs font-semibold text-[#57534E] tracking-widest uppercase mb-4">
              Community
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:tanishchess@gmail.com"
                  className="text-sm text-[#78716C] hover:text-[#F97316] transition-colors duration-200 cursor-pointer"
                >
                  Contact the Project
                </a>
              </li>
              <li>
                <Link
                  href="/about#partner"
                  className="text-sm text-[#78716C] hover:text-[#F97316] transition-colors duration-200 cursor-pointer"
                >
                  Temple Partnership (Tier 2)
                </Link>
              </li>
              <li>
                <Link
                  href="/about#removal"
                  className="text-sm text-[#78716C] hover:text-[#F97316] transition-colors duration-200 cursor-pointer"
                >
                  Removal Request
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-[#1A1410] border border-[rgba(249,115,22,0.1)]">
              <p className="text-xs text-[#A8A29E] leading-relaxed">
                Temple boards may request removal from this platform at any
                time, unconditionally. Response within 72 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#57534E]">
            © 2026 Deepam
          </p>
          <p className="text-xs text-[#57534E]">
            All data is public Tier 1 signal. Model estimates carry uncertainty.
          </p>
        </div>
      </div>
    </footer>
  );
}
