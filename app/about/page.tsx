import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StateIndicator from "@/components/StateIndicator";
import Link from "next/link";
import { ArrowRight, Envelope } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "About Deepam — Methodology and Community",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#0D0A07] pt-20 pb-24">
        {/* Hero */}
        <section
          className="pt-16 pb-20 relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 70%), #0D0A07",
          }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div
              className="w-3 h-3 rounded-full mx-auto mb-8"
              style={{
                background: "#F59E0B",
                boxShadow:
                  "0 0 10px rgba(245,158,11,0.9), 0 0 30px rgba(245,158,11,0.5)",
                animation: "flicker 2.5s ease-in-out infinite",
              }}
            />
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-[#FAFAF9] tracking-tight mb-6 leading-none">
              About Deepam
            </h1>
            <p className="text-[#A8A29E] text-lg leading-relaxed max-w-2xl mx-auto">
              Deepam (Tamil: a lamp) is a probabilistic system for identifying
              community-supported Hindu temples in the South Asian diaspora that
              may benefit from increased support before they are forced into
              ritual concessions.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          {/* The Problem */}
          <section id="problem">
            <div className="gold-rule mb-8" />
            <h2 className="font-display text-3xl font-semibold text-[#FAFAF9] mb-6">
              The problem
            </h2>
            <div className="space-y-4 text-[#A8A29E] text-base leading-relaxed">
              <p>
                Hindu temples in the diaspora operate on financial terms quite
                different from temples in India. There is no government religious
                endowment, no centuries-old land grant. The vast majority of
                community-supported temples in the United States operate as
                501(c)(3) nonprofits funded almost entirely by monthly donations
                from a relatively small congregation.
              </p>
              <p>
                When the congregation contracts, the financial pressure becomes
                visible in the temple's ritual product. First, materials
                downgrade: copper instead of silver for routine abhishekam,
                smaller floral garlands, reduced festival decoration. Then priest
                hours are reduced. Then festivals are shortened or combined. By
                the time community members not closely involved notice, the temple
                has often made multiple incremental adjustments.
              </p>
              <p className="text-[#FAFAF9]">
                The information asymmetry is the core problem. Deepam exists to
                make that need legible at a moment when supporting attention
                could plausibly change the trajectory.
              </p>
            </div>
          </section>

          {/* The Four States */}
          <section id="methodology">
            <div className="gold-rule mb-8" />
            <h2 className="font-display text-3xl font-semibold text-[#FAFAF9] mb-2">
              The four operational states
            </h2>
            <p className="text-[#78716C] mb-8 text-base">
              Each state is defined by what the temple does and does not do in
              its ritual practice, ordered by degree of resource constraint.
            </p>

            <div className="space-y-3">
              {[
                {
                  state: "sustaining" as const,
                  platformLabel: "Sustaining",
                  definition:
                    "Full ritual standards. Traditional ritual materials (silver, gold, full flowers, full food). All advertised festivals at full scale. Stable priestly staffing. Programming runs without interruption.",
                },
                {
                  state: "lightly-compromising" as const,
                  platformLabel: "Quietly Tightening",
                  definition:
                    "Visible to regular attendees but typically not outsiders. Granular substitutions: copper for silver, smaller garlands, smaller prasad portions. Festivals on the calendar but quietly tightened. Daily and weekly services continue.",
                },
                {
                  state: "seriously-compromising" as const,
                  platformLabel: "Visibly Cutting Back",
                  definition:
                    "Visible to any attentive observer. Programmatic cuts now structural. A festival shortened, combined, or skipped. Priest hours reduced. Building maintenance deferred. Food shortages at festivals.",
                },
                {
                  state: "stripped-down" as const,
                  platformLabel: "Operating at Minimum",
                  definition:
                    "Minimum viable ritual presence. Major festivals reduced or skipped. Daily worship may be irregular or shared across priests serving multiple temples. Board may publicly discuss mergers, building sale, or restructuring.",
                },
              ].map((item) => (
                <div
                  key={item.state}
                  className="bg-[#1A1410] border border-[rgba(249,115,22,0.1)] rounded-xl p-5"
                >
                  <StateIndicator
                    state={item.state}
                    size="md"
                    className="mb-3"
                  />
                  <p className="text-sm text-[#A8A29E] leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section id="how-it-works">
            <div className="gold-rule mb-8" />
            <h2 className="font-display text-3xl font-semibold text-[#FAFAF9] mb-6">
              How the model works
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#FAFAF9] mb-3">
                  Tier 1: Public signals
                </h3>
                <p className="text-[#A8A29E] text-sm leading-relaxed mb-3">
                  Deepam aggregates publicly accessible data for every temple:
                  Google Trends search volume, social media post timestamps and
                  engagement counts, event listings, Google Maps review
                  timestamps, directory listings on Hindu temple federations, and
                  Wayback Machine archives of temple websites.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Google Trends",
                    "Social media timestamps",
                    "Event listings",
                    "Maps reviews",
                    "Directory listings",
                    "Wayback Machine",
                  ].map((source) => (
                    <div
                      key={source}
                      className="bg-[#241D16] border border-[rgba(249,115,22,0.08)] rounded-lg px-3 py-2 text-xs text-[#78716C]"
                    >
                      {source}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-[#FAFAF9] mb-3">
                  Tier 2: Partner data
                </h3>
                <p className="text-[#A8A29E] text-sm leading-relaxed">
                  Temples that opt to partner with Deepam share insider signals
                  voluntarily: monthly donation volume (percent change,
                  not absolute figures), festival attendance counts, ritual
                  material categories, priest tenure stability, and capital
                  reserve status. Tier 2 signals are never made public. They
                  improve model accuracy and validate that Tier 1 signals
                  correlate with the financial reality they proxy.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-[#FAFAF9] mb-3">
                  The MNAR mechanism
                </h3>
                <p className="text-[#A8A29E] text-sm leading-relaxed mb-3">
                  The technically distinctive feature of the model is its
                  treatment of missing observations. Standard approaches assume
                  that whether an observation is recorded is independent of the
                  underlying state (Missing At Random). For diaspora temples,
                  this is structurally violated.
                </p>
                <div className="bg-[#241D16] border-l-2 border-[#F97316] rounded-r-xl pl-4 pr-4 py-4">
                  <p className="text-sm text-[#D6D3D1] italic leading-relaxed">
                    "A temple that has not updated its Facebook page in eight
                    months has not gone missing at random. The absence of a
                    Facebook post is itself a signal."
                  </p>
                </div>
                <p className="text-[#A8A29E] text-sm leading-relaxed mt-3">
                  Deepam uses Missing Not At Random (MNAR) modeling, with
                  state-dependent observation intensity factors. The presence or
                  absence of an observation enters the inference recursion as
                  evidence, not just noise. This is why Deepam estimates are
                  calibrated rather than systematically biased toward
                  over-confidence in well-monitored temples.
                </p>
              </div>
            </div>
          </section>

          {/* Known Confounders */}
          <section id="confounders">
            <div className="gold-rule mb-8" />
            <h2 className="font-display text-3xl font-semibold text-[#FAFAF9] mb-4">
              Known limitations
            </h2>
            <p className="text-[#78716C] text-sm mb-6 leading-relaxed">
              The mapping from observable digital signals to underlying financial
              state is not clean. Deepam is explicit about the confounders that
              can produce low Tier 1 signal at temples that are not under
              financial pressure.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Temple age",
                  body: "Older temples often have older volunteer bases that do not manage social media, regardless of financial state.",
                },
                {
                  title: "Rurality",
                  body: "Temples in secondary metros produce lower absolute Google Trends and Maps review volume regardless of state.",
                },
                {
                  title: "Language and platform preference",
                  body: "Temples whose congregations communicate primarily in Tamil, Telugu, Kannada, or Malayalam often coordinate through WhatsApp, which the model cannot observe.",
                },
                {
                  title: "Digital adoption history",
                  body: "Some temples never adopted Facebook even when fully thriving. The model can distinguish these cases but relies on Wayback Machine archives that may be incomplete.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 bg-[#1A1410] border border-[rgba(249,115,22,0.08)] rounded-xl p-4"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                    style={{ background: "#78716C" }}
                  />
                  <div>
                    <h4 className="font-body font-semibold text-sm text-[#D6D3D1] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#78716C] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#57534E] mt-4 leading-relaxed">
              When signal pattern is consistent with multiple confounders, the
              platform displays "Insufficient Evidence" rather than a forced
              label.
            </p>
          </section>

          {/* Platform ethics */}
          <section id="ethics">
            <div className="gold-rule mb-8" />
            <h2 className="font-display text-3xl font-semibold text-[#FAFAF9] mb-4">
              Framing and ethics
            </h2>
            <div className="space-y-4 text-[#A8A29E] text-sm leading-relaxed">
              <p>
                Deepam does not rank temples by religious quality, devotional
                rigor, or community importance. The states describe operational
                regimes under financial pressure, not statements about whether a
                temple is good, holy, or worth attending.
              </p>
              <p>
                Every design decision in Deepam passes through a single test:
                would a board member of a flagged temple, reading the platform's
                description of their institution, recognize it as supportive
                rather than diagnostic?
              </p>
              <p>
                All Tier 1 signals are public information accessible to any
                internet user. The ethical floor is higher than the legal floor:
                Deepam actively offers Tier 2 partnership to flagged temples and
                removes any temple from the platform unconditionally on board
                request.
              </p>
            </div>
          </section>

          {/* Partner + Removal */}
          <section id="partner">
            <div className="gold-rule mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1A1410] border border-[rgba(245,158,11,0.2)] rounded-xl p-6">
                <h3 className="font-display text-xl font-semibold text-[#FAFAF9] mb-3">
                  Tier 2 partnership
                </h3>
                <p className="text-sm text-[#A8A29E] leading-relaxed mb-4">
                  Temple boards that partner with Deepam receive a private
                  dashboard showing the model's interpretation of their signals,
                  see their financial data inform the calibration, and have
                  direct contact with the project.
                </p>
                <a
                  href="mailto:tanishchess@gmail.com?subject=Deepam Tier 2 Partnership"
                  className="btn-saffron inline-flex items-center gap-2 cursor-pointer text-sm"
                >
                  <Envelope size={14} weight="fill" />
                  Inquire about partnership
                </a>
              </div>

              <div
                id="removal"
                className="bg-[#1A1410] border border-[rgba(249,115,22,0.1)] rounded-xl p-6"
              >
                <h3 className="font-display text-xl font-semibold text-[#FAFAF9] mb-3">
                  Removal request
                </h3>
                <p className="text-sm text-[#A8A29E] leading-relaxed mb-4">
                  Removal is unconditional. A temple board does not need to
                  explain its reasoning. Response within 72 hours. The temple
                  board's request is final.
                </p>
                <a
                  href="mailto:tanishchess@gmail.com?subject=Deepam Removal Request"
                  className="btn-ghost inline-flex items-center gap-2 cursor-pointer text-sm"
                >
                  <Envelope size={14} weight="fill" />
                  Request removal
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
