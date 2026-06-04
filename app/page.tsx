import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import StateIndicator, { StateDot } from "@/components/StateIndicator";
import NCMapClient from "@/components/NCMapClient";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Hero } from "@/components/ui/animated-hero";
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

      {/* ─── DIYA — atmospheric full-bleed ─── */}
      <section
        className="relative border-t border-[rgba(249,115,22,0.12)] overflow-hidden"
        style={{ height: "500px", background: "#0D0A07" }}
      >
        {/* 3D diya fills the right side — purely atmospheric */}
        <div className="absolute inset-y-0 right-0 w-3/5 pointer-events-none">
          <DiyaClient className="w-full h-full" />
        </div>

        {/* Gradient mask: hard left edge → transparent right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #0D0A07 32%, rgba(13,10,7,0.92) 48%, rgba(13,10,7,0.5) 68%, transparent 88%)",
          }}
        />

        {/* Spotlight anchored to text area */}
        <Spotlight className="-top-20 left-0 md:left-40 md:-top-10 opacity-60" fill="#F97316" />

        {/* Content floats over the gradient */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-[420px]">
            <h2
              className="font-display font-bold text-[#FAFAF9] mb-4"
              style={{ fontSize: "clamp(1.75rem, 2.75vw, 38px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Temples, alive<br />
              <span className="text-[#F97316]">in three dimensions.</span>
            </h2>
            <p className="text-[15px] text-[#78716C] leading-relaxed mb-8 max-w-sm">
              Deepam surfaces which diaspora temples in North Carolina are
              quietly tightening their rituals, before the community notices.
            </p>
            <Link href="/temples" className="btn-primary">
              Explore temples
            </Link>
          </div>
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
                <span className="text-xs font-semibold bg-[#F97316] text-white px-3 py-1.5 rounded-[6px]">Find Temples</span>
              </div>
            </div>
            <div className="flex items-center gap-8 px-6 py-3.5 border-b border-[rgba(249,115,22,0.08)]">
              {[
                { n: activeTemples.length, label: "tracked",        color: "#FAFAF9" },
                { n: sustainingCount,      label: "sustaining",     color: "#10B981" },
                { n: attentionCount,       label: "need attention", color: "#F97316" },
              ].map(s => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-bold text-lg" style={{ color: s.color, letterSpacing: "-0.02em" }}>{s.n}</span>
                  <span className="text-xs text-[#78716C]">{s.label}</span>
                </div>
              ))}
              <div className="ml-auto text-xs text-[#57534E]">North Carolina</div>
            </div>
            <div className="flex-1 overflow-hidden px-4 py-2.5 flex flex-col gap-0.5">
              {temples.slice(0, 7).map((t) => {
                const color = STATE_COLORS[t.deepamState];
                return (
                  <div key={t.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1A1410] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-sm font-medium text-[#FAFAF9] flex-1 truncate">{t.shortName}</span>
                    <span className="text-xs text-[#78716C] hidden sm:block">{t.city}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[4px] ml-2 flex-shrink-0" style={{ color, background: `${color}18`, border: `1px solid ${color}28` }}>
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
          {/* Section header shelf */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[rgba(249,115,22,0.1)]">
            <h2 className="section-heading text-[#FAFAF9] font-display font-bold">
              Hindu temples across{" "}
              <span className="text-[#F59E0B]">North Carolina</span>
            </h2>
            <div className="hidden sm:flex flex-wrap gap-2 mb-0.5">
              {stateCounts.map(({ state, count }) => (
                <div key={state} className="flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 border border-[rgba(249,115,22,0.12)] bg-[rgba(249,115,22,0.03)]">
                  <StateDot state={state} size={5} />
                  <span className="text-[12px] text-[#78716C]">{STATE_LABELS[state]}</span>
                  <span className="text-[12px] font-bold" style={{ color: STATE_COLORS[state] }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
          <NCMapClient temples={activeTemples} height="520px" />
          <div className="mt-4 flex sm:hidden flex-wrap gap-2">
            {stateCounts.map(({ state, count }) => (
              <div key={state} className="flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 border border-[rgba(249,115,22,0.12)]">
                <StateDot state={state} size={5} />
                <span className="text-[12px] text-[#78716C]">{STATE_LABELS[state]}</span>
                <span className="text-[12px] font-bold" style={{ color: STATE_COLORS[state] }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGIONS ─── */}
      <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]" style={{ background: "linear-gradient(to bottom, rgba(249,115,22,0.025) 0px, #0D0A07 64px)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="pb-6 mb-8 border-b border-[rgba(249,115,22,0.1)]">
            <h2 className="section-heading text-[#FAFAF9] font-display font-bold">
              By <span className="text-[#F59E0B]">region</span>
            </h2>
          </div>

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
                    <h3 className="font-display font-bold text-[#FAFAF9] group-hover:text-[#F97316] transition-colors text-2xl" style={{ letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                      {REGION_LABELS[region]}
                    </h3>
                    {hasConcern && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-[#F97316]" />}
                  </div>
                  <div className="flex items-baseline gap-2.5 mb-5">
                    <p className="font-display font-bold text-[#F59E0B]" style={{ fontSize: "clamp(2.5rem, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                      {regionTempleCount[region]}
                    </p>
                    <p className="text-[14px] text-[#78716C]">{regionTempleCount[region] === 1 ? "temple" : "temples"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[#57534E] group-hover:text-[#F97316] transition-colors font-medium">Explore region</span>
                    <ArrowRight size={12} strokeWidth={2} className="text-[#57534E] group-hover:text-[#F97316] -translate-x-0.5 group-hover:translate-x-0 transition-all" />
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
                    <h3 className="font-display font-bold text-[#FAFAF9] group-hover:text-[#F97316] transition-colors text-lg" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                      {REGION_LABELS[region]}
                    </h3>
                    {hasConcern && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ml-2 bg-[#F97316]" />}
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="font-display font-bold text-[#F59E0B]" style={{ fontSize: "clamp(2rem, 3.5vw, 40px)", lineHeight: 1, letterSpacing: "-0.035em" }}>
                      {regionTempleCount[region]}
                    </p>
                    <p className="text-[13px] text-[#78716C]">{regionTempleCount[region] === 1 ? "temple" : "temples"}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] text-[#57534E] group-hover:text-[#F97316] transition-colors font-medium">Explore</span>
                    <ArrowRight size={11} strokeWidth={2} className="text-[#57534E] group-hover:text-[#F97316] -translate-x-0.5 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED TEMPLES ─── */}
      {featuredTemples.length > 0 && (
        <section className="py-20 bg-[#1A1410] border-t border-[rgba(249,115,22,0.08)]" style={{ background: "linear-gradient(to bottom, rgba(249,115,22,0.03) 0px, #1A1410 72px)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="pb-6 mb-8 border-b border-[rgba(249,115,22,0.1)]">
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold">
                Temples that could use{" "}
                <span className="text-[#F59E0B]">your support</span>
              </h2>
              <p className="text-[14px] text-[#57534E] mt-2 leading-relaxed max-w-xl">
                Showing patterns consistent with operational tightening. Sustained engagement shifts the trajectory.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTemples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} raised />
              ))}
            </div>
            <div className="mt-8">
              <Link href="/temples" className="btn-ghost">
                View all temples <ArrowRight size={13} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
            <div>
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold mb-5">
                How Deepam <span className="text-[#F59E0B]">works</span>
              </h2>
              <p className="text-[15px] text-[#78716C] leading-relaxed mb-8">
                A hidden Markov model maps the latent financial state of each temple from publicly observable signals,
                treating missing data as evidence rather than noise.
              </p>
              <Link href="/about" className="btn-ghost">
                Full methodology <ArrowRight size={13} strokeWidth={1.75} />
              </Link>
            </div>

            <div>
              {steps.map((step, i) => (
                <div key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6 border-t border-[rgba(249,115,22,0.08)]">
                  <span
                    className="font-display font-bold leading-none pt-0.5 text-2xl tabular-nums"
                    style={{ color: "rgba(249,115,22,0.2)", letterSpacing: "-0.03em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-[#D6D3D1] mb-1.5 text-[16px]" style={{ lineHeight: 1.3, letterSpacing: "-0.015em" }}>
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[#78716C] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[rgba(249,115,22,0.08)]" />
            </div>
          </div>

          {/* State legend */}
          <div className="mt-20 pt-10 border-t border-[rgba(249,115,22,0.08)]">
            <p className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.12em] mb-6">The four operational states</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {(["sustaining", "lightly-compromising", "seriously-compromising", "stripped-down"] as const).map((state) => (
                <div key={state}>
                  <StateIndicator state={state} showLabel size="sm" />
                  <p className="text-[13px] text-[#78716C] leading-relaxed mt-3">
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
      <section className="py-16 bg-[#1A1410] border-t border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[16px] text-[#A8A29E] leading-relaxed max-w-xl">
            Tracking{" "}
            <span className="font-semibold text-[#FAFAF9]">{activeTemples.length} Hindu temples</span>{" "}
            across North Carolina.{" "}
            <span className="font-semibold text-[#10B981]">{sustainingCount} sustaining</span>{" "}
            at full standards.{" "}
            <span className="font-semibold text-[#F97316]">{attentionCount} show patterns</span>{" "}
            consistent with operational tightening.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.12)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="section-heading text-[#FAFAF9] font-display font-bold mb-4">
                Lamps need <span className="text-[#F59E0B]">tending.</span>
              </h2>
              <p className="text-[15px] text-[#78716C] leading-relaxed">
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
