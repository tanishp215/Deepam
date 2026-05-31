import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import StateIndicator, { StateDot } from "@/components/StateIndicator";
import NCMapClient from "@/components/NCMapClient";
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

export default function HomePage() {
  const activeTemples = getActiveTemples();
  const sustainingCount = getTemplesByState("sustaining").length;
  const lightlyCount = getTemplesByState("lightly-compromising").length;
  const seriouslyCount = getTemplesByState("seriously-compromising").length;
  const attentionCount = lightlyCount + seriouslyCount;

  // 3 temples needing most attention for featured section
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

      {/* ─── HERO ───────────────────────────────── */}
      <section
        className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%), #0D0A07",
        }}
      >
        {/* Decorative lotus grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(249,115,22,0.8) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow source at top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Deepam lamp icon */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div
                  className="w-5 h-5 rounded-full bg-[#F59E0B]"
                  style={{
                    boxShadow:
                      "0 0 12px rgba(245,158,11,1), 0 0 30px rgba(245,158,11,0.6), 0 0 60px rgba(245,158,11,0.3)",
                    animation: "flicker 2.5s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    background: "rgba(245,158,11,0.3)",
                    animationDuration: "3s",
                  }}
                />
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-semibold tracking-[-0.02em] text-[#FAFAF9] mb-6 leading-none">
              Finding the temples
              <br />
              <span
                className="italic"
                style={{
                  color: "#FCD34D",
                  textShadow:
                    "0 0 30px rgba(245,158,11,0.5), 0 0 60px rgba(245,158,11,0.2)",
                }}
              >
                that need us
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A8A29E] leading-relaxed mb-10 max-w-2xl mx-auto">
              Deepam tracks North Carolina's Hindu diaspora temples using public
              signals and probabilistic modeling, surfacing which ones are quietly
              tightening their rituals before the community notices.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/temples"
                className="btn-saffron flex items-center gap-2 cursor-pointer text-base px-6 py-3"
              >
                <MapPin weight="fill" size={16} />
                Explore NC Temples
              </Link>
              <Link
                href="/about"
                className="btn-ghost flex items-center gap-2 cursor-pointer text-base px-6 py-3"
              >
                How Deepam works
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 max-w-xl mx-auto gap-6 sm:gap-8">
            {[
              {
                value: activeTemples.length.toString(),
                label: "Temples tracked",
                color: "#FAFAF9",
              },
              {
                value: sustainingCount.toString(),
                label: "Sustaining",
                color: "#FCD34D",
              },
              {
                value: attentionCount.toString(),
                label: "Need attention",
                color: "#F97316",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-display text-3xl sm:text-4xl font-semibold leading-none mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-[#78716C] font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(transparent, rgba(13,10,7,0.8))",
          }}
        />
      </section>

      {/* ─── MAP SECTION ────────────────────────── */}
      <section className="py-20 bg-[#0D0A07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="section-heading text-[#FAFAF9] mb-3">
              Hindu temples across
              <span className="text-[#F97316] italic"> North Carolina</span>
            </h2>
            <p className="text-[#78716C] text-base max-w-2xl">
              Each point of light is a temple. The brightness reflects its
              current operational state, from sustaining gold to the quieter
              amber of institutions quietly tightening.
            </p>
          </div>

          {/* Map */}
          <NCMapClient temples={getActiveTemples()} height="520px" />

          {/* State counts below map */}
          <div className="mt-6 flex flex-wrap gap-3">
            {(
              [
                "sustaining",
                "lightly-compromising",
                "seriously-compromising",
                "insufficient-evidence",
              ] as const
            ).map((state) => {
              const count = temples.filter(
                (t) => t.deepamState === state
              ).length;
              return (
                <div
                  key={state}
                  className="flex items-center gap-2 bg-[#1A1410] border border-[rgba(249,115,22,0.1)] rounded-full px-3 py-1.5"
                >
                  <StateDot state={state} size={8} />
                  <span className="text-xs text-[#A8A29E] font-body">
                    {STATE_LABELS[state]}
                  </span>
                  <span
                    className="text-xs font-semibold font-body"
                    style={{ color: STATE_COLORS[state] }}
                  >
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── REGIONS SECTION ─────────────────────── */}
      <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="section-heading text-[#FAFAF9] mb-3">
              By region
            </h2>
            <p className="text-[#78716C] text-base max-w-xl">
              Temple communities cluster differently in the Triangle versus
              Charlotte versus smaller metros. Each region tells a different story.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {regionOrder.map((region) => {
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
                  <p className="text-2xl font-body font-bold text-[#FAFAF9] mb-1">
                    {regionTempleCount[region]}
                  </p>
                  <p className="text-xs text-[#78716C] font-body">
                    {regionTempleCount[region] === 1 ? "temple" : "temples"} tracked
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs text-[#F97316] font-body font-medium">
                      Explore region
                    </span>
                    <ArrowRight size={12} className="text-[#F97316]" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEMPLES NEEDING ATTENTION ──────────── */}
      {featuredTemples.length > 0 && (
        <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <div className="flex items-start gap-3">
                <div
                  className="w-1 h-8 rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: "linear-gradient(180deg, #F97316, #EA580C)" }}
                />
                <div>
                  <h2 className="section-heading text-[#FAFAF9] mb-2">
                    Temples that could use your support
                  </h2>
                  <p className="text-[#78716C] text-base max-w-2xl">
                    Based on Tier 1 public signals, these institutions show patterns
                    consistent with operational tightening. Sustained engagement can
                    shift their trajectory.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTemples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>

            <div className="mt-8 text-center">
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

      {/* ─── HOW IT WORKS ───────────────────────── */}
      <section className="py-20 bg-[#0D0A07] border-t border-[rgba(249,115,22,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="section-heading text-[#FAFAF9] mb-4">
              How Deepam works
            </h2>
            <p className="text-[#78716C] text-base leading-relaxed">
              A hidden Markov model maps the latent financial state of each
              temple from publicly observable signals, treating missing data as
              evidence rather than noise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Public signal collection",
                description:
                  "We aggregate Google Trends data, social media timestamps, event listings, Maps reviews, and Wayback Machine archives for every temple.",
                color: "#F59E0B",
              },
              {
                step: "2",
                title: "MNAR-aware inference",
                description:
                  "Temples under financial pressure post less. We treat the absence of signal as informative, not missing, using state-dependent observation intensity.",
                color: "#F97316",
              },
              {
                step: "3",
                title: "Calibrated state estimates",
                description:
                  "Each temple receives a probability distribution over four operational states, displayed with honest uncertainty bands and actionable next steps.",
                color: "#EF4444",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-[#1A1410] border border-[rgba(249,115,22,0.1)] rounded-xl p-6"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 font-body font-bold text-sm"
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#FAFAF9] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#78716C] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* State legend */}
          <div className="mt-10 bg-[#1A1410] border border-[rgba(249,115,22,0.1)] rounded-xl p-6">
            <h3 className="font-display text-base font-semibold text-[#FAFAF9] mb-4">
              The four operational states
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(
                [
                  "sustaining",
                  "lightly-compromising",
                  "seriously-compromising",
                  "stripped-down",
                ] as const
              ).map((state) => (
                <div key={state} className="flex flex-col gap-2">
                  <StateIndicator state={state} showLabel size="sm" />
                  <p className="text-xs text-[#57534E] leading-relaxed font-body">
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

          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="btn-ghost inline-flex items-center gap-2 cursor-pointer"
            >
              Read the full methodology
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(249,115,22,0.1) 0%, transparent 70%), #0D0A07",
        }}
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-4 h-4 rounded-full bg-[#F59E0B]"
              style={{
                boxShadow:
                  "0 0 10px rgba(245,158,11,0.9), 0 0 30px rgba(245,158,11,0.5), 0 0 60px rgba(245,158,11,0.2)",
                animation: "flicker 2.5s ease-in-out infinite",
              }}
            />
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[#FAFAF9] mb-4 leading-none tracking-tight">
            Lamps need tending.
            <br />
            <span className="text-[#FCD34D] italic">We can help.</span>
          </h2>
          <p className="text-[#78716C] text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Browse NC temples, pledge to attend upcoming events, and direct
            your support where it can change the trajectory.
          </p>
          <Link
            href="/temples"
            className="btn-saffron inline-flex items-center gap-2 cursor-pointer text-base px-8 py-3"
          >
            <MapPin weight="fill" size={16} />
            Explore all temples
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
