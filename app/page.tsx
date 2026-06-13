import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import StateIndicator from "@/components/StateIndicator";
import MapHero from "@/components/MapHero";
import {
  temples,
  getActiveTemples,
  getTemplesByState,
  type Region,
} from "@/data/temples";
import { ArrowRight } from "lucide-react";

const regionOrder: Region[] = [
  "triangle", "charlotte", "triad", "fayetteville", "eastern-nc", "western-nc",
];

const regionTempleCount: Record<Region, number> = {
  triangle: 0, charlotte: 0, triad: 0,
  fayetteville: 0, "eastern-nc": 0, "western-nc": 0, emerging: 0,
};
temples.forEach((t) => { regionTempleCount[t.region]++; });

const steps = [
  {
    title: "Public signal collection",
    description:
      "Google Trends data, social media timestamps, event listings, Maps reviews, and Wayback Machine archives for every temple.",
  },
  {
    title: "MNAR-aware inference",
    description:
      "Temples under financial pressure post less. The absence of signal is treated as informative, not random, using state-dependent observation intensity.",
  },
  {
    title: "Calibrated state estimates",
    description:
      "Each temple receives a probability distribution over four operational states, displayed with honest uncertainty and actionable next steps.",
  },
];

export default function HomePage() {
  const activeTemples    = getActiveTemples();
  const sustainingCount  = getTemplesByState("sustaining").length;
  const lightlyCount     = getTemplesByState("lightly-compromising").length;
  const seriouslyCount   = getTemplesByState("seriously-compromising").length;

  const featuredTemples = temples
    .filter(
      (t) =>
        t.deepamState === "lightly-compromising" ||
        t.deepamState === "seriously-compromising"
    )
    .slice(0, 3);

  return (
    <>
      <Navigation />

      {/* ─── MAP HERO — full-screen, interactive ─── */}
      <MapHero />

      {/* ─── STATS BAR ─── */}
      <section className="bg-[#0D0A07] border-b border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[rgba(249,115,22,0.08)]">
            {[
              { value: activeTemples.length,  color: "#FAFAF9",  label: "Temples tracked"        },
              { value: sustainingCount,        color: "#10B981",  label: "Sustaining"              },
              { value: lightlyCount,           color: "#F59E0B",  label: "Lightly compromising"    },
              { value: seriouslyCount,         color: "#F97316",  label: "Seriously compromising"  },
            ].map(({ value, color, label }) => (
              <div key={label} className="px-8 py-8 first:pl-0 last:pr-0">
                <p
                  className="font-display font-bold tabular-nums"
                  style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)", lineHeight: 1, letterSpacing: "-0.04em", color }}
                >
                  {value}
                </p>
                <p className="text-[11px] text-[#57534E] mt-2 uppercase tracking-[0.1em]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED TEMPLES ─── */}
      {featuredTemples.length > 0 && (
        <section className="py-24 bg-[#0D0A07] border-b border-[rgba(249,115,22,0.08)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <p className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.12em] mb-3">
                Needs attention
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <h2 className="section-heading text-[#FAFAF9] font-display font-bold">
                  Temples that could use{" "}
                  <span className="text-[#F59E0B]">your support</span>
                </h2>
                <Link href="/temples" className="btn-ghost flex-shrink-0">
                  View all <ArrowRight size={13} strokeWidth={1.75} />
                </Link>
              </div>
              <p className="text-[14px] text-[#57534E] mt-3 leading-relaxed max-w-xl">
                Showing patterns consistent with operational tightening. Sustained engagement shifts the trajectory.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTemples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} raised />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 bg-[#0D0A07] border-b border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.12em] mb-3">
                The model
              </p>
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold mb-5">
                How Deepam <span className="text-[#F59E0B]">works</span>
              </h2>
              <p className="text-[15px] text-[#78716C] leading-relaxed mb-8">
                A hidden Markov model maps the latent financial state of each
                temple from publicly observable signals, treating missing data as
                evidence rather than noise.
              </p>
              <Link href="/about" className="btn-ghost">
                Full methodology <ArrowRight size={13} strokeWidth={1.75} />
              </Link>
            </div>

            <div>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 py-6 border-t border-[rgba(249,115,22,0.08)]"
                >
                  <span
                    className="font-display font-bold leading-none pt-0.5 text-2xl tabular-nums"
                    style={{ color: "rgba(249,115,22,0.35)", letterSpacing: "-0.03em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="font-display font-semibold text-[#D6D3D1] mb-2 text-[15px]"
                      style={{ lineHeight: 1.3, letterSpacing: "-0.015em" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-[#78716C] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[rgba(249,115,22,0.08)]" />
            </div>
          </div>

          {/* State legend */}
          <div className="mt-20 pt-10 border-t border-[rgba(249,115,22,0.08)]">
            <p className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.12em] mb-6">
              The four operational states
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {(
                [
                  "sustaining",
                  "lightly-compromising",
                  "seriously-compromising",
                  "stripped-down",
                ] as const
              ).map((state) => (
                <div key={state}>
                  <StateIndicator state={state} showLabel size="sm" />
                  <p className="text-[13px] text-[#78716C] leading-relaxed mt-3">
                    {state === "sustaining" &&
                      "Full ritual standards, stable staffing, regular programming."}
                    {state === "lightly-compromising" &&
                      "Granular substitutions visible to regular attendees only."}
                    {state === "seriously-compromising" &&
                      "Structural cuts: festivals shortened, priest hours reduced."}
                    {state === "stripped-down" &&
                      "Minimum viable presence. Major festivals at risk."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="py-24 bg-[#0D0A07]"
        style={{
          background: "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(249,115,22,0.06) 0%, transparent 70%), #0D0A07",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
            <div className="max-w-lg">
              <p className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.12em] mb-3">
                Get involved
              </p>
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold mb-4">
                Lamps need <span className="text-[#F59E0B]">tending.</span>
              </h2>
              <p className="text-[15px] text-[#78716C] leading-relaxed">
                Browse NC temples, pledge to attend upcoming events, and direct
                your support where it can change the trajectory.
              </p>
            </div>
            <Link href="/temples" className="btn-primary flex-shrink-0">
              Explore all temples
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
