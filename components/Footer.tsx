import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <p className="font-display text-xl font-bold text-[#FAFAF9] mb-3 tracking-tight">
              Deepam
            </p>
            <p className="text-[15px] text-[#78716C] leading-relaxed max-w-xs">
              A probabilistic framework for identifying diaspora temples under
              financial stress. Finding the lamps that need tending.
            </p>
            <p className="mt-3 text-[13px] text-[#57534E]">
              Deepam (Tamil): a lamp.
            </p>
          </div>

          {/* Platform nav */}
          <div>
            <p className="text-[13px] font-semibold text-[#A8A29E] mb-4 uppercase tracking-widest">Platform</p>
            <ul className="space-y-2.5">
              {[
                { href: "/",                      label: "Home"             },
                { href: "/temples",               label: "Explore Temples"  },
                { href: "/about",                 label: "About Deepam"     },
                { href: "/about#methodology",     label: "Methodology"      },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#78716C] hover:text-[#FAFAF9] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-[13px] font-semibold text-[#A8A29E] mb-4 uppercase tracking-widest">Community</p>
            <ul className="space-y-2.5 mb-6">
              <li>
                <a
                  href="mailto:tanishchess@gmail.com"
                  className="text-[15px] text-[#78716C] hover:text-[#FAFAF9] transition-colors duration-200"
                >
                  Contact the Project
                </a>
              </li>
              <li>
                <Link
                  href="/about#partner"
                  className="text-[15px] text-[#78716C] hover:text-[#FAFAF9] transition-colors duration-200"
                >
                  Temple Partnership (Tier 2)
                </Link>
              </li>
              <li>
                <Link
                  href="/about#removal"
                  className="text-[15px] text-[#78716C] hover:text-[#FAFAF9] transition-colors duration-200"
                >
                  Removal Request
                </Link>
              </li>
            </ul>
            <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <p className="text-[13px] text-[#57534E] leading-relaxed">
                Temple boards may request removal at any time, unconditionally.
                Response within 72 hours.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[#57534E]">© 2026 Deepam</p>
          <p className="text-[13px] text-[#57534E]">
            All data is public Tier 1 signal. Model estimates carry uncertainty.
          </p>
        </div>
      </div>
    </footer>
  );
}
