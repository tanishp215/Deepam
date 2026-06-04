import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import StateIndicator, { StateDot } from "@/components/StateIndicator";
import NCMapClient from "@/components/NCMapClient";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Hero } from "@/components/ui/animated-hero";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { DiyaClient } from "@/components/ui/diya-client";
import {
  temples,
  getActiveTemples,
  getTemplesByState,
  REGION_LABELS,
  STATE_LABELS,
  STATE_COLORS,
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
    description: "Google Trends data, social media timestamps, event listings, Maps reviews, and Wayback Machine archives for every temple.",
  },
  {
    title: "MNAR-aware inference",
    description: "Temples under financial pressure post less. The absence of signal is treated as informative, not random, using state-dependent observation intensity.",
  },
  {
    title: "Calibrated state estimates",
    description: "Each temple receives a probability distribution over four operational states, displayed with honest uncertainty and actionable next steps.",
  },
];

export default function HomePage() {
  const activeTemples   = getActiveTemples();
  const sustainingCount = getTemplesByState("sustaining").length;
  const lightlyCount    = getTemplesByState("lightly-compromising").length;
  const seriouslyCount  = getTemplesByState("seriously-compromising").length;
  const attentionCount  = lightlyCount + seriouslyCount;

  const featuredTemples = temples
    .filter((t) => t.deepamState === "lightly-compromising" || t.deepamState === "seriously-compromising")
    .slice(0, 3);

  const stateCounts = (
    ["sustaining", "lightly-compromising", "seriously-compromising", "insufficient-evidence"] as const
  ).map((state) => ({ state, count: temples.filter((t) => t.deepamState === state).length }));

  return (
    <>
      <Navigation />

      {/* ─── HERO ─── */}
      <Hero />

      {/* ─── SPLINE 3D ─── */}
      <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="w-full h-[500px] bg-[#0D0A07] border-[rgba(249,115,22,0.2)] relative overflow-hidden">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#F97316" />
            <div className="flex h-full">
              <div className="flex-1 p-10 relative z-10 flex flex-col justify-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#FAFAF9] leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Temples, alive<br />
                  <span className="text-[#F97316]">in three dimensions.</span>
                </h2>
                <p className="text-[#78716C] text-[16px] leading-relaxed max-w-sm mb-8">
                  Deepam surfaces which diaspora temples in North Carolina are
                  quietly tightening their rituals, before the community notices.
                </p>
                <Link href="/temples" className="btn-primary">
                  Explore temples
                </Link>
              </div>
              <div className="flex-1 relative min-h-0">
                <div className="absolute inset-0">
                  <DiyaClient className="w-full h-full" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ─── SCROLL SHOWCASE ─── */}
      <div className="bg-[#0D0A07] overflow-hidden border-t border-[rgba(249,115,22,0.08)]">
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold">
                Every temple,{" "}
                <span className="text-[#F97316]">mapped and monitored.</span>
              </h2>
            </div>
          }
        >
          <div className="w-full h-full bg-[#0D0A07] rounded-[14px] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(249,115,22,0.1)]">
              <span className="font-bold text-[#FAFAF9] text-base tracking-tight">Deepam</span>
              <div className="flex items-center gap-6">
                <span className="text-sm text-[#78716C]">Explore</span>
                <span className="text-sm text-[#78716C]">About</span>
                <span className="text-xs font-bold bg-[#F97316] text-white px-3 py-1.5 rounded-full">Find Temples</span>
              </div>
            </div>
            <div className="flex items-center gap-8 px-6 py-4 border-b border-[rgba(249,115,22,0.08)]">
              {[
                { n: activeTemples.length, label: "tracked",        color: "#FAFAF9" },
                { n: sustainingCount,      label: "sustaining",     color: "#F59E0B" },
                { n: attentionCount,       label: "need attention", color: "#F97316" },
              ].map(s => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-bold text-xl" style={{ color: s.color }}>{s.n}</span>
                  <span className="text-xs text-[#78716C]">{s.label}</span>
                </div>
              ))}
              <div className="ml-auto text-xs text-[#57534E]">North Carolina · {activeTemples.length} temples</div>
            </div>
            <div className="flex-1 overflow-hidden px-4 py-3 flex flex-col gap-0.5">
              {temples.slice(0, 7).map((t) => {
                const color = STATE_COLORS[t.deepamState];
                return (
                  <div key={t.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1A1410] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-sm font-medium text-[#FAFAF9] flex-1 truncate">{t.shortName}</span>
                    <span className="text-xs text-[#78716C] hidden sm:block">{t.city}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0" style={{ color, background: `${color}18` }}>
                      {STATE_LABELS[t.deepamState]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="px-6 py-3 border-t border-[rgba(249,115,22,0.08)] flex items-center justify-between">
              <span className="text-xs text-[#57534E]">Tier 1 signals, updated daily</span>
              <span className="text-xs text-[#F97316] font-medium">View all temples</span>
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* ─── MAP ─── */}
      <section className="py-20 bg-[#0D0A07]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <h2 className="section-heading text-[#FAFAF9] font-display font-bold">
              Hindu temples across{" "}
              <span className="text-[#F59E0B]">North Carolina</span>
            </h2>
            <div className="hidden sm:flex flex-wrap gap-2">
              {stateCounts.map(({ state, count }) => (
                <div key={state} className="flex items-center gap-2 rounded-full px-3 py-1.5 border border-[rgba(249,115,22,0.12)]">
                  <StateDot state={state} size={6} />
                  <span className="text-[13px] text-[#78716C]">{STATE_LABELS[state]}</span>
                  <span className="text-[13px] font-bold" style={{ color: STATE_COLORS[state] }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
          <NCMapClient temples={activeTemples} height="520px" />
          <div className="mt-4 flex sm:hidden flex-wrap gap-2">
            {stateCounts.map(({ state, count }) => (
              <div key={state} className="flex items-center gap-2 rounded-full px-3 py-1.5 border border-[rgba(249,115,22,0.12)]">
                <StateDot state={state} size={6} />
                <span className="text-[13px] text-[#78716C]">{STATE_LABELS[state]}</span>
                <span className="text-[13px] font-bold" style={{ color: STATE_COLORS[state] }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGIONS ─── */}
      <section className="py-20 bg-[#1A1410] border-t border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-heading text-[#FAFAF9] font-display font-bold mb-8">
            By <span className="text-[#F59E0B]">region</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Triangle — featured double-width */}
            {(() => {
              const region = "triangle";
              const hasConcern = temples.filter((t) => t.region === region).some(
                (t) => t.deepamState === "lightly-compromising" || t.deepamState === "seriously-compromising"
              );
              return (
                <Link key={region} href="/temples?region=triangle" className="card-temple col-span-2 p-6 group block">
                  <div className="flex items-start justify-between mb-5">
                    <h3 className="font-display font-bold text-[#FAFAF9] group-hover:text-[#F97316] transition-colors text-2xl" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                      {REGION_LABELS[region]}
                    </h3>
                    {hasConcern && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-[#F97316]" />}
                  </div>
                  <div className="flex items-baseline gap-2.5 mb-5">
                    <p className="font-display font-bold text-[#F59E0B] text-5xl" style={{ lineHeight: 1, letterSpacing: "-0.03em" }}>
                      {regionTempleCount[region]}
                    </p>
                    <p className="text-[15px] text-[#78716C]">{regionTempleCount[region] === 1 ? "temple" : "temples"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#57534E] group-hover:text-[#F97316] transition-colors font-medium">Explore region</span>
                    <ArrowRight size={13} strokeWidth={2} className="text-[#57534E] group-hover:text-[#F97316] -translate-x-0.5 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              );
            })()}

            {regionOrder.slice(1).map((region) => {
              const hasConcern = temples.filter((t) => t.region === region).some(
                (t) => t.deepamState === "lightly-compromising" || t.deepamState === "seriously-compromising"
              );
              return (
                <Link key={region} href={`/temples?region=${region}`} className="card-temple p-6 group block">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-bold text-[#FAFAF9] group-hover:text-[#F97316] transition-colors text-lg" style={{ letterSpacing: "-0.015em", lineHeight: 1.2 }}>
                      {REGION_LABELS[region]}
                    </h3>
                    {hasConcern && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ml-2 bg-[#F97316]" />}
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="font-display font-bold text-[#F59E0B] text-4xl" style={{ lineHeight: 1, letterSpacing: "-0.025em" }}>
                      {regionTempleCount[region]}
                    </p>
                    <p className="text-[14px] text-[#78716C]">{regionTempleCount[region] === 1 ? "temple" : "temples"}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] text-[#57534E] group-hover:text-[#F97316] transition-colors font-medium">Explore</span>
                    <ArrowRight size={12} strokeWidth={2} className="text-[#57534E] group-hover:text-[#F97316] -translate-x-0.5 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED TEMPLES ─── */}
      {featuredTemples.length > 0 && (
        <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold mb-3">
                Temples that could use{" "}
                <span className="text-[#F59E0B]">your support</span>
              </h2>
              <p className="text-[16px] text-[#78716C] max-w-2xl leading-relaxed">
                These institutions show patterns consistent with operational tightening.
                Sustained engagement can shift their trajectory.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTemples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} raised />
              ))}
            </div>
            <div className="mt-8">
              <Link href="/temples" className="btn-ghost">
                View all temples <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 bg-[#1A1410] border-t border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
            <div>
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold mb-5">
                How Deepam <span className="text-[#F59E0B]">works</span>
              </h2>
              <p className="text-[16px] text-[#A8A29E] leading-relaxed mb-8">
                A hidden Markov model maps the latent financial state of each temple from publicly observable signals,
                treating missing data as evidence rather than noise.
              </p>
              <Link href="/about" className="btn-ghost">
                Full methodology <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </div>

            <div>
              {steps.map((step, i) => (
                <div key={i} className="grid grid-cols-[3rem_1fr] gap-5 py-6 border-t border-[rgba(249,115,22,0.1)]">
                  <span className="font-display font-bold leading-none pt-0.5 text-[28px]" style={{ color: "rgba(249,115,22,0.22)", letterSpacing: "-0.02em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-[#FAFAF9] mb-1.5 text-[18px]" style={{ lineHeight: 1.25, letterSpacing: "-0.015em" }}>
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-[#78716C] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[rgba(249,115,22,0.1)]" />
            </div>
          </div>

          {/* State legend */}
          <div className="mt-20 pt-20 border-t border-[rgba(249,115,22,0.1)]">
            <p className="text-[13px] font-semibold text-[#A8A29E] uppercase tracking-widest mb-6">The four operational states</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {(["sustaining", "lightly-compromising", "seriously-compromising", "stripped-down"] as const).map((state) => (
                <div key={state}>
                  <StateIndicator state={state} showLabel size="sm" />
                  <p className="text-[14px] text-[#78716C] leading-relaxed mt-3">
                    {state === "sustaining"             && "Full ritual standards, stable staffing, regular programming."}
                    {state === "lightly-compromising"   && "Granular substitutions visible to regular attendees only."}
                    {state === "seriously-compromising" && "Structural cuts: festivals shortened, priest hours reduced."}
                    {state === "stripped-down"          && "Minimum viable presence. Major festivals at risk."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[17px] text-[#A8A29E] leading-relaxed max-w-xl">
            Tracking{" "}
            <span className="font-semibold text-[#FAFAF9]">{activeTemples.length} Hindu temples</span>{" "}
            across North Carolina.{" "}
            <span className="font-semibold text-[#F59E0B]">{sustainingCount} sustaining</span>{" "}
            at full standards.{" "}
            <span className="font-semibold text-[#F97316]">{attentionCount} show patterns</span>{" "}
            consistent with operational tightening.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[#1A1410] border-t border-[rgba(249,115,22,0.12)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold mb-4">
                Lamps need <span className="text-[#F59E0B]">tending.</span>
              </h2>
              <p className="text-[16px] text-[#A8A29E] leading-relaxed">
                Browse NC temples, pledge to attend upcoming events, and direct your support where it can change the trajectory.
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
