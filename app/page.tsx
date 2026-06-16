import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Asterism from "@/components/Asterism";
import TempleCard from "@/components/TempleCard";
import HeroMap from "@/components/HeroMap";
import {
  temples,
  getActiveTemples,
  getTemplesByState,
} from "@/data/temples";

const steps = [
  {
    num: "01",
    title: "Public signal collection",
    body: "Google Trends data, social media timestamps, event listings, Maps reviews, and Wayback Machine archives for every temple.",
  },
  {
    num: "02",
    title: "MNAR-aware inference",
    body: "Temples under financial pressure post less. The absence of signal is treated as informative, not random, using state-dependent observation intensity.",
  },
  {
    num: "03",
    title: "Calibrated state estimates",
    body: "Each temple receives a probability distribution over four operational states, displayed with honest uncertainty.",
  },
  {
    num: "04",
    title: "Honest uncertainty",
    body: "When evidence is thin, we say so. The model marks 'Insufficient Evidence' rather than interpolate — a temple's silence is not a verdict.",
  },
];

export default function HomePage() {
  const activeTemples   = getActiveTemples();
  const sustainingCount = getTemplesByState("sustaining").length;
  const lightlyCount    = getTemplesByState("lightly-compromising").length;
  const seriouslyCount  = getTemplesByState("seriously-compromising").length;
  const unknownCount    = getTemplesByState("insufficient-evidence").length;
  const dimmingCount    = lightlyCount + seriouslyCount;

  const dimmingTemples = temples
    .filter(
      (t) =>
        t.deepamState === "lightly-compromising" ||
        t.deepamState === "seriously-compromising"
    )
    .slice(0, 3);

  return (
    <>
      <Navigation />

      {/* ─── §6.1.1 DISPATCH HERO ─── */}
      <section>
        <div
          className="max-w-4xl mx-auto px-6"
          style={{ paddingTop: "calc(68px + 52px)", paddingBottom: "36px" }}
        >
          {/* Dateline */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              fontVariant: "small-caps",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--brass)",
              marginBottom: "22px",
            }}
          >
            No. 27 · Dispatch from June 16, 2026
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              fontVariationSettings: '"opsz" 144',
              maxWidth: "18ch",
              marginBottom: "22px",
            }}
          >
            Twenty-six lamps in North&nbsp;Carolina.
          </h1>

          {/* Deck */}
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "21px",
              fontWeight: 400,
              lineHeight: 1.45,
              color: "var(--ink-muted)",
              fontVariationSettings: '"opsz" 32',
              maxWidth: "46ch",
              marginBottom: "28px",
            }}
          >
            Seven are dimming. We have been tracking them since 2025.
          </p>

          {/* §5.2 — Typographic view toggle (stub; Constellation wired in next step) */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 500,
                fontVariant: "small-caps",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
              }}
            >
              View ·
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 500,
                fontVariant: "small-caps",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink)",
                textDecoration: "underline",
                textDecorationColor: "var(--oxblood)",
                textUnderlineOffset: "5px",
                textDecorationThickness: "1px",
              }}
            >
              Map
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--ink-faint)" }}>
              /
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 500,
                fontVariant: "small-caps",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
              }}
            >
              Constellation
            </span>
          </div>
        </div>

        {/* Map — full-width, below the text */}
        <HeroMap temples={activeTemples} />
      </section>

      {/* ─── CONTENT COLUMN ─── */}
      <div className="max-w-4xl mx-auto px-6">

        {/* §6.1.2 Asterism */}
        <Asterism />

        {/* §6.1.3 Numbers as ledger prose */}
        <section aria-label="Summary figures">
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(20px, 2.8vw, 34px)",
              fontWeight: 300,
              lineHeight: 1.55,
              color: "var(--ink-soft)",
              maxWidth: "44ch",
              fontVariationSettings: '"opsz" 60',
            }}
          >
            We are tracking <Num>{activeTemples.length}</Num> temples across
            North Carolina. <Num>{sustainingCount}</Num>{" "}
            {sustainingCount === 1 ? "is" : "are"} sustaining their full ritual
            standard.{" "}
            {lightlyCount > 0 && (
              <>
                <Num>{lightlyCount}</Num>{" "}
                {lightlyCount === 1 ? "is" : "are"} quietly tightening.{" "}
              </>
            )}
            {seriouslyCount > 0 && (
              <>
                <Num>{seriouslyCount}</Num>{" "}
                {seriouslyCount === 1 ? "has" : "have"} visibly begun cutting
                back.{" "}
              </>
            )}
            {unknownCount > 0 && (
              <>
                <Num>{unknownCount}</Num>{" "}
                {unknownCount === 1 ? "sits" : "sit"} beyond the reach of
                public signal.
              </>
            )}
          </p>
        </section>

        {/* §6.1.4 Asterism */}
        <Asterism />

        {/* §6.1.5 Three lamps dimming */}
        {dimmingTemples.length > 0 && (
          <section aria-label="Temples needing attention">
            <div style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--ink)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginBottom: "12px",
                }}
              >
                Three lamps the model believes are dimming.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "17px",
                  color: "var(--ink-muted)",
                  lineHeight: 1.55,
                  maxWidth: "54ch",
                }}
              >
                Sustained engagement shifts the trajectory. Read the records
                before you pledge.
              </p>
            </div>

            <div>
              {dimmingTemples.map((temple, i) => (
                <TempleCard key={temple.id} temple={temple} index={i + 1} />
              ))}
            </div>

            {dimmingCount > 3 && (
              <div style={{ marginTop: "32px" }}>
                <Link
                  href="/temples"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 500,
                    fontVariant: "small-caps",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--brass)",
                    textDecoration: "none",
                  }}
                >
                  Read all {dimmingCount} records →
                </Link>
              </div>
            )}
            {dimmingCount <= 3 && (
              <div style={{ marginTop: "32px" }}>
                <Link
                  href="/temples"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 500,
                    fontVariant: "small-caps",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--brass)",
                    textDecoration: "none",
                  }}
                >
                  View all {activeTemples.length} records →
                </Link>
              </div>
            )}
          </section>
        )}

        {/* §6.1.6 How Deepam works — colophon */}
        <section aria-label="Methodology" style={{ marginTop: "80px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px",
            }}
            className="lg:grid-cols-[5fr_4fr]"
          >
            {/* Left — narrative essay */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  marginBottom: "20px",
                }}
              >
                The method
              </p>
              <p
                className="set-body"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "17px",
                  lineHeight: 1.65,
                  color: "var(--ink-soft)",
                  maxWidth: "50ch",
                }}
              >
                Deepam does not rely on temple self-reporting. Instead, it reads
                the public record — event listings that stop being updated,
                social media accounts that go quiet, Google Maps hours that
                revert to default. These are the signals a financially stressed
                institution emits before it asks for help.
              </p>
              <p
                className="set-body"
                style={{
                  fontFamily: "var(--font-serif)",
                  marginTop: "20px",
                  fontSize: "17px",
                  lineHeight: 1.65,
                  color: "var(--ink-soft)",
                  maxWidth: "50ch",
                }}
              >
                The model treats silence as information — not randomly missing,
                but missing in a pattern that correlates with financial
                contraction. This is the{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                    color: "var(--ink)",
                  }}
                >
                  MNAR
                </span>{" "}
                (missing not at random) assumption at the heart of the hidden
                Markov approach.{" "}
                <Link
                  href="/about"
                  style={{
                    fontStyle: "italic",
                    color: "var(--ink-soft)",
                    textDecoration: "underline",
                    textDecorationColor: "var(--brass)",
                    textDecorationThickness: "1px",
                    textUnderlineOffset: "4px",
                  }}
                >
                  Read the full methodology.
                </Link>
              </p>
            </div>

            {/* Right — numbered sidebar */}
            <div>
              {steps.map((step) => (
                <div
                  key={step.num}
                  style={{
                    borderTop: "1px solid rgba(28,26,23,0.10)",
                    paddingTop: "18px",
                    paddingBottom: "18px",
                    display: "grid",
                    gridTemplateColumns: "2rem 1fr",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "rgba(164,113,72,0.55)",
                      lineHeight: 1.6,
                      paddingTop: "1px",
                    }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--ink-soft)",
                        marginBottom: "6px",
                        lineHeight: 1.3,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "14px",
                        color: "var(--ink-muted)",
                        lineHeight: 1.55,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(28,26,23,0.10)" }} />
            </div>
          </div>
        </section>

        {/* §6.1.7 Asterism */}
        <Asterism />

        {/* §6.1.8 Closing call */}
        <section aria-label="Closing" style={{ paddingBottom: "96px" }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(18px, 2.2vw, 24px)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--ink-soft)",
              lineHeight: 1.65,
              maxWidth: "48ch",
              marginBottom: "24px",
            }}
          >
            Each lamp the model marks is a community of hundreds. Each pledge
            to attend, give, or visit shifts the model&apos;s estimate for that
            temple in the next month&apos;s dispatch.
          </p>
          <p>
            <Link
              href="/temples"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "17px",
                color: "var(--ink-soft)",
                textDecoration: "underline",
                textDecorationColor: "var(--oxblood)",
                textDecorationThickness: "1px",
                textUnderlineOffset: "5px",
              }}
            >
              Read the next record →
            </Link>
          </p>
        </section>

      </div>

      <Footer />
    </>
  );
}

/* Inline mono numeral — makes numbers stand out within Fraunces prose */
function Num({ children }: { children: number }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontVariantNumeric: "tabular-nums",
        color: "var(--ink)",
        fontSize: "0.88em",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </span>
  );
}
