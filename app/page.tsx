import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import StateIndicator, { StateDot } from "@/components/StateIndicator";
import NCMapClient from "@/components/NCMapClient";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Hero } from "@/components/ui/animated-hero";
import {
  temples,
  getActiveTemples,
  getTemplesByState,
  REGION_LABELS,
  STATE_LABELS,
  STATE_COLORS,
  type Region,
} from "@/data/temples";
import { MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";

const regionOrder: Region[] = [
  "triangle",
  "charlotte",
  "triad",
  "fayetteville",
  "eastern-nc",
  "western-nc",
];

const regionTempleCount: Record<Region, number> = {
  triangle: 0,
  charlotte: 0,
  triad: 0,
  fayetteville: 0,
  "eastern-nc": 0,
  "western-nc": 0,
  emerging: 0,
};
temples.forEach((t) => {
  regionTempleCount[t.region]++;
});

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
  const activeTemples = getActiveTemples();
  const sustainingCount = getTemplesByState("sustaining").length;
  const lightlyCount = getTemplesByState("lightly-compromising").length;
  const seriouslyCount = getTemplesByState("seriously-compromising").length;
  const attentionCount = lightlyCount + seriouslyCount;

  const featuredTemples = temples
    .filter(
      (t) =>
        t.deepamState === "lightly-compromising" ||
        t.deepamState === "seriously-compromising"
    )
    .slice(0, 3);

  const stateCounts = (
    [
      "sustaining",
      "lightly-compromising",
      "seriously-compromising",
      "insufficient-evidence",
    ] as const
  ).map((state) => ({
    state,
    count: temples.filter((t) => t.deepamState === state).length,
  }));

  return (
    <>
      <Navigation />

      {/* ─── HERO — Animated ─── */}
      <Hero />

      {/* ─── SCROLL SHOWCASE ─── */}
      <div className="bg-[#0D0A07] overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              <p className="text-sm text-[#F97316] font-body font-semibold tracking-widest uppercase mb-5">
                Platform preview
              </p>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[#FAFAF9] leading-tight">
                Every temple,{" "}
                <span className="text-[#F59E0B]">mapped and monitored.</span>
              </h2>
            </div>
          }
        >
          <Image
            src="https://picsum.photos/seed/nc-aerial-map/1400/720"
            alt="Deepam platform map view showing NC Hindu temples"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      {/* ─── MAP ─── */}
      <section className="py-16 bg-[#0D0A07] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-[#FAFAF9] tracking-tight leading-tight">
              Hindu temples across North Carolina
            </h2>
            <div className="hidden sm:flex flex-wrap gap-2">
              {stateCounts.map(({ state, count }) => (
                <div
                  key={state}
                  className="flex items-center gap-2 bg-[#1A1410] border border-[rgba(249,115,22,0.08)] rounded-full px-3 py-1.5"
                >
                  <StateDot state={state} size={7} />
                  <span className="text-xs text-[#78716C] font-body">
                    {STATE_LABELS[state]}
                  </span>
                  <span
                    className="text-xs font-semibold font-body"
                    style={{ color: STATE_COLORS[state] }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <NCMapClient temples={getActiveTemples()} height="520px" />

          {/* Mobile state counts */}
          <div className="mt-4 flex sm:hidden flex-wrap gap-2">
            {stateCounts.map(({ state, count }) => (
              <div
                key={state}
                className="flex items-center gap-2 bg-[#1A1410] border border-[rgba(249,115,22,0.08)] rounded-full px-3 py-1.5"
              >
                <StateDot state={state} size={7} />
                <span className="text-xs text-[#78716C] font-body">
                  {STATE_LABELS[state]}
                </span>
                <span
                  className="text-xs font-semibold font-body"
                  style={{ color: STATE_COLORS[state] }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGIONS — asymmetric grid ─── */}
      <section className="py-16 bg-[#0D0A07] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-[#FAFAF9] tracking-tight leading-tight">
              By region
            </h2>
            <p className="text-sm text-[#57534E] hidden sm:block font-body">
              Each region tells a different story
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Triangle — featured, double-width */}
            {(() => {
              const region = "triangle";
              const regionTemples = temples.filter((t) => t.region === region);
              const hasConcern = regionTemples.some(
                (t) =>
                  t.deepamState === "lightly-compromising" ||
                  t.deepamState === "seriously-compromising"
              );
              return (
                <Link
                  key={region}
                  href={`/temples?region=${region}`}
                  className="card-temple col-span-2 p-6 group cursor-pointer block"
                >
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="font-display text-2xl font-semibold text-[#FAFAF9] group-hover:text-[#FCD34D] transition-colors leading-tight">
                      {REGION_LABELS[region]}
                    </h3>
                    {hasConcern && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                        style={{
                          background: "#F97316",
                          boxShadow: "0 0 6px rgba(249,115,22,0.6)",
                        }}
                      />
                    )}
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="font-display text-5xl font-semibold text-[#FAFAF9]">
                      {regionTempleCount[region]}
                    </p>
                    <p className="text-sm text-[#57534E] font-body">
                      {regionTempleCount[region] === 1 ? "temple" : "temples"}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-body font-medium">Explore region</span>
                    <ArrowRight size={12} />
                  </div>
                </Link>
              );
            })()}

            {/* Remaining regions — normal cells */}
            {regionOrder.slice(1).map((region) => {
              const regionTemples = temples.filter((t) => t.region === region);
              const hasConcern = regionTemples.some(
                (t) =>
                  t.deepamState === "lightly-compromising" ||
                  t.deepamState === "seriously-compromising"
              );
              return (
                <Link
                  key={region}
                  href={`/temples?region=${region}`}
                  className="card-temple p-5 group cursor-pointer block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-semibold text-[#FAFAF9] group-hover:text-[#FCD34D] transition-colors leading-snug">
                      {REGION_LABELS[region]}
                    </h3>
                    {hasConcern && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ml-2"
                        style={{
                          background: "#F97316",
                          boxShadow: "0 0 6px rgba(249,115,22,0.6)",
                        }}
                      />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="font-display text-3xl font-semibold text-[#FAFAF9]">
                      {regionTempleCount[region]}
                    </p>
                    <p className="text-xs text-[#57534E] font-body">
                      {regionTempleCount[region] === 1 ? "temple" : "temples"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-body font-medium">Explore</span>
                    <ArrowRight size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEMPLES NEEDING ATTENTION ─── */}
      {featuredTemples.length > 0 && (
        <section className="py-16 bg-[#0D0A07] border-t border-[rgba(255,255,255,0.05)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-[#FAFAF9] tracking-tight leading-tight mb-3">
                Temples that could use your support
              </h2>
              <p className="text-[#78716C] text-base max-w-2xl">
                Based on public signals, these institutions show patterns consistent with
                operational tightening. Sustained engagement can shift their trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTemples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/temples"
                className="btn-ghost inline-flex items-center gap-2 cursor-pointer"
              >
                View all temples
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS — numbered list, not equal cards ─── */}
      <section className="py-16 bg-[#0D0A07] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">

            {/* Left: description */}
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-[#FAFAF9] mb-5 tracking-tight leading-tight">
                How Deepam works
              </h2>
              <p className="text-[#78716C] text-base leading-relaxed mb-8">
                A hidden Markov model maps the latent financial state of each
                temple from publicly observable signals, treating missing data
                as evidence rather than noise.
              </p>
              <Link
                href="/about"
                className="btn-ghost inline-flex items-center gap-2 cursor-pointer"
              >
                Full methodology
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: numbered steps */}
            <div>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[3.5rem_1fr] gap-5 py-7 border-t border-[rgba(255,255,255,0.05)]"
                >
                  <span className="font-display text-4xl font-semibold leading-none text-[rgba(249,115,22,0.2)] pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#FAFAF9] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#78716C] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[rgba(255,255,255,0.05)]" />
            </div>

          </div>

          {/* State legend */}
          <div className="mt-14 pt-10 border-t border-[rgba(255,255,255,0.05)]">
            <p className="text-xs font-semibold text-[#57534E] font-body tracking-widest uppercase mb-6">
              The four operational states
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
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
                  <p className="text-xs text-[#57534E] leading-relaxed mt-2 font-body">
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

      {/* ─── CTA — horizontal, left-aligned ─── */}
      <section className="py-16 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-2 h-2 rounded-full bg-[#F59E0B]"
                  style={{
                    boxShadow:
                      "0 0 8px rgba(245,158,11,0.8), 0 0 20px rgba(245,158,11,0.3)",
                  }}
                />
              </div>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-[#FAFAF9] leading-tight mb-3">
                Lamps need tending.
              </h2>
              <p className="text-[#78716C] text-base leading-relaxed">
                Browse NC temples, pledge to attend upcoming events, and direct
                your support where it can change the trajectory.
              </p>
            </div>
            <Link
              href="/temples"
              className="btn-saffron flex-shrink-0 flex items-center gap-2 cursor-pointer text-base px-7 py-3"
            >
              <MapPin weight="fill" size={16} />
              Explore all temples
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
