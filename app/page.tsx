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
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const regionOrder: Region[] = [
  "triangle",
  "charlotte",
  "triad",
  "fayetteville",
  "eastern-nc",
  "western-nc",
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
  const attentionCount   = lightlyCount + seriouslyCount;

  const featuredTemples = temples
    .filter(
      (t) =>
        t.deepamState === "lightly-compromising" ||
        t.deepamState === "seriously-compromising"
    )
    .slice(0, 3);

  const stateCounts = (
    ["sustaining", "lightly-compromising", "seriously-compromising", "insufficient-evidence"] as const
  ).map((state) => ({
    state,
    count: temples.filter((t) => t.deepamState === state).length,
  }));

  return (
    <>
      <Navigation />

      {/* ─── HERO — white ─── */}
      <Hero />

      {/* ─── SCROLL SHOWCASE — white ─── */}
      <div className="bg-white overflow-hidden border-t border-[rgba(0,13,16,0.06)]">
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              <h2
                className="font-display font-bold text-[#000d10]"
                style={{ fontSize: "clamp(2rem,4vw,52px)", lineHeight: 1.09, letterSpacing: "-0.52px" }}
              >
                Every temple,{" "}
                <span style={{ color: "#F97316" }}>mapped and monitored.</span>
              </h2>
            </div>
          }
        >
          <Image
            src="https://picsum.photos/seed/nc-aerial-map/1400/720"
            alt="Deepam platform map view"
            height={720}
            width={1400}
            className="mx-auto object-cover h-full object-center rounded-[30px]"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      {/* ─── MAP — obsidian ─── */}
      <section className="py-[68px] bg-[#0D0A07]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(1.75rem,3vw,52px)", lineHeight: 1.09, letterSpacing: "-0.52px" }}
            >
              Hindu temples across North Carolina
            </h2>
            <div className="hidden sm:flex flex-wrap gap-2">
              {stateCounts.map(({ state, count }) => (
                <div
                  key={state}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 border border-[rgba(255,255,255,0.1)]"
                >
                  <StateDot state={state} size={7} />
                  <span className="text-[14px] text-[#8e8e95]">{STATE_LABELS[state]}</span>
                  <span className="text-[14px] font-bold" style={{ color: STATE_COLORS[state] }}>
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <NCMapClient temples={activeTemples} height="520px" />

          <div className="mt-4 flex sm:hidden flex-wrap gap-2">
            {stateCounts.map(({ state, count }) => (
              <div
                key={state}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 border border-[rgba(255,255,255,0.1)]"
              >
                <StateDot state={state} size={7} />
                <span className="text-[14px] text-[#8e8e95]">{STATE_LABELS[state]}</span>
                <span className="text-[14px] font-bold" style={{ color: STATE_COLORS[state] }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGIONS — white ─── */}
      <section className="py-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-8">
            <h2
              className="font-display font-bold text-[#000d10]"
              style={{ fontSize: "clamp(1.75rem,3vw,52px)", lineHeight: 1.09, letterSpacing: "-0.52px" }}
            >
              By region
            </h2>
            <p className="hidden sm:block text-[17px] text-[#8e8e95]">
              Each region tells a different story
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-[23px]">
            {/* Triangle — featured, double-width */}
            {(() => {
              const region = "triangle";
              const hasConcern = temples
                .filter((t) => t.region === region)
                .some((t) => t.deepamState === "lightly-compromising" || t.deepamState === "seriously-compromising");
              return (
                <Link
                  key={region}
                  href="/temples?region=triangle"
                  className="card-temple col-span-2 p-[22px] group cursor-pointer block"
                >
                  <div className="flex items-start justify-between mb-6">
                    <h3
                      className="font-display font-bold text-[#000d10] group-hover:text-[#bc7155] transition-colors leading-tight"
                      style={{ fontSize: "30px", lineHeight: 1.1, letterSpacing: "-0.3px" }}
                    >
                      {REGION_LABELS[region]}
                    </h3>
                    {hasConcern && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                        style={{ background: "#bc7155" }}
                      />
                    )}
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p
                      className="font-display font-bold text-[#000d10]"
                      style={{ fontSize: "52px", lineHeight: 1.09, letterSpacing: "-0.52px" }}
                    >
                      {regionTempleCount[region]}
                    </p>
                    <p className="text-[17px] text-[#8e8e95]">
                      {regionTempleCount[region] === 1 ? "temple" : "temples"}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[#bc7155] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[17px] font-bold">Explore region</span>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              );
            })()}

            {/* Other regions */}
            {regionOrder.slice(1).map((region) => {
              const hasConcern = temples
                .filter((t) => t.region === region)
                .some((t) => t.deepamState === "lightly-compromising" || t.deepamState === "seriously-compromising");
              return (
                <Link
                  key={region}
                  href={`/temples?region=${region}`}
                  className="card-temple p-[22px] group cursor-pointer block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className="font-display font-bold text-[#000d10] group-hover:text-[#bc7155] transition-colors leading-tight"
                      style={{ fontSize: "20px", lineHeight: 1.2 }}
                    >
                      {REGION_LABELS[region]}
                    </h3>
                    {hasConcern && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ml-2 bg-[#F97316]" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p
                      className="font-display font-bold text-[#000d10]"
                      style={{ fontSize: "37px", lineHeight: 1.1 }}
                    >
                      {regionTempleCount[region]}
                    </p>
                    <p className="text-[17px] text-[#8e8e95]">
                      {regionTempleCount[region] === 1 ? "temple" : "temples"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[#bc7155] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[17px] font-bold">Explore</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED TEMPLES — obsidian ─── */}
      {featuredTemples.length > 0 && (
        <section className="py-[68px] bg-[#0D0A07]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: "clamp(1.75rem,3vw,52px)", lineHeight: 1.09, letterSpacing: "-0.52px" }}
              >
                Temples that could use your support
              </h2>
              <p className="text-[17px] text-[#8e8e95] max-w-2xl">
                Based on public signals, these institutions show patterns
                consistent with operational tightening. Sustained engagement
                can shift their trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[23px]">
              {featuredTemples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} dark />
              ))}
            </div>

            <div className="mt-8">
              <Link href="/temples" className="btn-ghost">
                View all temples <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS — white ─── */}
      <section className="py-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">

            <div>
              <h2
                className="font-display font-bold text-[#000d10] mb-5"
                style={{ fontSize: "clamp(1.75rem,3vw,52px)", lineHeight: 1.09, letterSpacing: "-0.52px" }}
              >
                How Deepam works
              </h2>
              <p className="text-[17px] text-[#8e8e95] leading-relaxed mb-8">
                A hidden Markov model maps the latent financial state of each
                temple from publicly observable signals, treating missing data
                as evidence rather than noise.
              </p>
              <Link href="/about" className="btn-ghost-dark">
                Full methodology <ArrowRight size={16} />
              </Link>
            </div>

            <div>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[3.5rem_1fr] gap-5 py-7 border-t border-[rgba(0,13,16,0.08)]"
                >
                  <span
                    className="font-display font-bold leading-none pt-1"
                    style={{ fontSize: "37px", color: "rgba(0,13,16,0.15)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="font-display font-bold text-[#000d10] mb-2"
                      style={{ fontSize: "20px", lineHeight: 1.2 }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[17px] text-[#8e8e95] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[rgba(0,13,16,0.08)]" />
            </div>
          </div>

          {/* State legend */}
          <div className="mt-[68px] pt-[68px] border-t border-[rgba(0,13,16,0.08)]">
            <p
              className="text-[17px] font-bold text-[#000d10] mb-6"
              style={{ letterSpacing: "0.02em" }}
            >
              The four operational states
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[23px]">
              {(["sustaining", "lightly-compromising", "seriously-compromising", "stripped-down"] as const).map(
                (state) => (
                  <div key={state}>
                    <StateIndicator state={state} showLabel size="sm" />
                    <p className="text-[17px] text-[#8e8e95] leading-relaxed mt-3">
                      {state === "sustaining"              && "Full ritual standards, stable staffing, regular programming."}
                      {state === "lightly-compromising"    && "Granular substitutions visible to regular attendees only."}
                      {state === "seriously-compromising"  && "Structural cuts: festivals shortened, priest hours reduced."}
                      {state === "stripped-down"           && "Minimum viable presence. Major festivals at risk."}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS — obsidian ─── */}
      <section className="py-[68px] bg-[#0D0A07]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            {[
              { value: activeTemples.length, label: "Temples tracked" },
              { value: sustainingCount,      label: "Sustaining"       },
              { value: attentionCount,       label: "Need attention"   },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-display font-bold text-white"
                  style={{ fontSize: "clamp(2.5rem,5vw,63px)", lineHeight: 0.91, letterSpacing: "-0.63px" }}
                >
                  {stat.value}
                </p>
                <p className="text-[17px] text-[#8e8e95] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA — obsidian ─── */}
      <section className="py-[68px] bg-[#0D0A07] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[23px]">
            <div className="max-w-lg">
              <h2
                className="font-display font-bold text-white mb-4"
                style={{ fontSize: "clamp(2rem,4vw,52px)", lineHeight: 1.09, letterSpacing: "-0.52px" }}
              >
                Lamps need tending.
              </h2>
              <p className="text-[17px] text-[#8e8e95] leading-relaxed">
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
