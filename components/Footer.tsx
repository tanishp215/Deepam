import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0D0A07]">
      <div className="max-w-7xl mx-auto px-6 py-[68px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-bold text-white mb-4 tracking-tight">
              Deepam
            </p>
            <p className="text-[17px] text-[#8e8e95] leading-relaxed max-w-xs">
              A probabilistic framework for identifying diaspora temples under
              financial stress. Finding the lamps that need tending.
            </p>
            <p className="mt-4 text-[17px] text-[#8e8e95]">
              Deepam (Tamil): a lamp.
            </p>
          </div>

          {/* Platform nav */}
          <div>
            <p className="text-[17px] font-bold text-white mb-4">Platform</p>
            <ul className="space-y-3">
              {[
                { href: "/",                      label: "Home"             },
                { href: "/temples",               label: "Explore Temples"  },
                { href: "/about",                 label: "About Deepam"     },
                { href: "/about#methodology",     label: "Methodology"      },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[17px] text-[#8e8e95] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-[17px] font-bold text-white mb-4">Community</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:tanishchess@gmail.com"
                  className="text-[17px] text-[#8e8e95] hover:text-white transition-colors duration-200"
                >
                  Contact the Project
                </a>
              </li>
              <li>
                <Link
                  href="/about#partner"
                  className="text-[17px] text-[#8e8e95] hover:text-white transition-colors duration-200"
                >
                  Temple Partnership (Tier 2)
                </Link>
              </li>
              <li>
                <Link
                  href="/about#removal"
                  className="text-[17px] text-[#8e8e95] hover:text-white transition-colors duration-200"
                >
                  Removal Request
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-[22px] rounded-[45px] border border-[rgba(255,255,255,0.08)]">
              <p className="text-[17px] text-[#8e8e95] leading-relaxed">
                Temple boards may request removal at any time, unconditionally.
                Response within 72 hours.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div
          className="pt-8 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[17px] text-[#8e8e95]">© 2026 Deepam</p>
          <p className="text-[17px] text-[#8e8e95]">
            All data is public Tier 1 signal. Model estimates carry uncertainty.
          </p>
        </div>
      </div>
    </footer>
  );
}
