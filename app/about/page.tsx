import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StateIndicator from "@/components/StateIndicator";
import Link from "next/link";
import Asterism from "@/components/Asterism";

export const metadata = {
  title: "About Deepam — Methodology and Ethics",
};

const signalSources = [
  "Google Trends",
  "Social media timestamps",
  "Event listings",
  "Maps reviews",
  "Directory listings",
  "Wayback Machine",
];

const confounders = [
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
];

const states: { state: "sustaining" | "lightly-compromising" | "seriously-compromising" | "stripped-down"; definition: string }[] = [
  {
    state: "sustaining",
    definition:
      "Full ritual standards. Traditional ritual materials (silver, gold, full flowers, full food). All advertised festivals at full scale. Stable priestly staffing. Programming runs without interruption.",
  },
  {
    state: "lightly-compromising",
    definition:
      "Visible to regular attendees but typically not outsiders. Granular substitutions: copper for silver, smaller garlands, smaller prasad portions. Festivals on the calendar but quietly tightened. Daily and weekly services continue.",
  },
  {
    state: "seriously-compromising",
    definition:
      "Visible to any attentive observer. Programmatic cuts now structural. A festival shortened, combined, or skipped. Priest hours reduced. Building maintenance deferred. Food shortages at festivals.",
  },
  {
    state: "stripped-down",
    definition:
      "Minimum viable ritual presence. Major festivals reduced or skipped. Daily worship may be irregular or shared across priests serving multiple temples. Board may publicly discuss mergers, building sale, or restructuring.",
  },
];

const mono = {
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  color: "var(--ink)",
  letterSpacing: "0.04em",
} as const;

const h2Style = {
  fontFamily: "var(--font-serif)",
  fontStyle: "italic" as const,
  fontSize: "26px",
  fontWeight: 400,
  color: "var(--ink)",
  marginBottom: "24px",
  lineHeight: 1.25,
} as const;

const bodyStyle = {
  fontFamily: "var(--font-serif)",
  fontSize: "17px",
  lineHeight: 1.65,
  color: "var(--ink-soft)",
} as const;

const outlineCta = {
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--oxblood)",
  border: "1px solid var(--oxblood)",
  borderRadius: "2px",
  padding: "8px 18px",
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "0.01em",
} as const;

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-h3 {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 20px;
          font-weight: 400;
          color: var(--ink);
          margin-bottom: 14px;
          line-height: 1.3;
        }
        .about-ledger {
          border-top: 1px solid rgba(201,184,122,0.12);
          border-bottom: 1px solid rgba(201,184,122,0.12);
          padding: 20px 0;
        }
        .about-ledger + .about-ledger {
          border-top: none;
        }
        .about-confounder {
          border-bottom: 1px solid rgba(201,184,122,0.1);
          padding: 20px 0;
        }
        .about-confounder:first-of-type {
          border-top: 1px solid rgba(201,184,122,0.1);
        }
      `}</style>

      <Navigation />

      <main style={{ minHeight: "100vh", background: "var(--paper)" }}>

        {/* Essay column */}
        <div style={{ maxWidth: "65ch", margin: "0 auto", padding: "0 24px" }}>

          {/* ── Hero ── */}
          <section style={{ paddingTop: "calc(68px + 64px)", paddingBottom: "40px" }}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--brass)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.14em",
              fontVariant: "small-caps",
              marginBottom: "20px",
            }}>
              No. 27 · About this project
            </p>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic" as const,
              fontWeight: 300,
              fontSize: "clamp(48px, 8vw, 72px)",
              color: "var(--ink)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "28px",
            }}>
              About Deepam.
            </h1>
            <p className="set-body" style={{ marginBottom: 0 }}>
              Deepam (Tamil: a lamp) is a probabilistic system for identifying
              community-supported Hindu temples in the South Asian diaspora that
              may benefit from increased support before they are forced into
              ritual concessions.
            </p>
          </section>

          <hr className="rule-brass" />

          {/* ── The Problem ── */}
          <section id="problem" style={{ padding: "48px 0" }}>
            <h2 style={h2Style}>Information asymmetry in the diaspora.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p className="set-body">
                Hindu temples in the diaspora operate on financial terms quite
                different from temples in India. There is no government religious
                endowment, no centuries-old land grant. The vast majority of
                community-supported temples in the United States operate as
                501(c)(3) nonprofits funded almost entirely by monthly donations
                from a relatively small congregation.
              </p>
              <p className="set-body">
                When the congregation contracts, the financial pressure becomes
                visible in the temple&apos;s ritual product. First, materials
                downgrade: copper instead of silver for routine abhishekam,
                smaller floral garlands, reduced festival decoration. Then priest
                hours are reduced. Then festivals are shortened or combined. By
                the time community members not closely involved notice, the temple
                has often made multiple incremental adjustments.
              </p>
              <p className="set-body" style={{ color: "var(--ink)" }}>
                The information asymmetry is the core problem. Deepam exists to
                make that need legible at a moment when supporting attention
                could plausibly change the trajectory.
              </p>
            </div>
          </section>

          <hr className="rule-brass" />

          {/* ── The Four Operational States ── */}
          <section id="methodology" style={{ padding: "48px 0" }}>
            <h2 style={h2Style}>The four operational states.</h2>
            <p style={{ ...bodyStyle, marginBottom: "28px" }}>
              Each state is defined by what the temple does and does not do in
              its ritual practice, ordered by degree of resource constraint.
            </p>

            <div>
              {states.map((item) => (
                <div key={item.state} className="about-ledger">
                  <StateIndicator state={item.state} size="md" className="mb-3" />
                  <p style={{ ...bodyStyle, fontSize: "15px", marginTop: "12px" }}>
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <hr className="rule-brass" />

          {/* ── How the model works ── */}
          <section id="how-it-works" style={{ padding: "48px 0" }}>
            <h2 style={h2Style}>How the model works.</h2>

            {/* Tier 1 */}
            <div style={{ marginBottom: "40px" }}>
              <h3 className="about-h3">Tier 1: Public signals.</h3>
              <p className="set-body" style={{ marginBottom: "16px" }}>
                Deepam aggregates publicly accessible data for every temple:
                Google Trends search volume, social media post timestamps and
                engagement counts, event listings, Google Maps review
                timestamps, directory listings on Hindu temple federations, and
                Wayback Machine archives of temple websites.
              </p>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: "20px 0 0 0",
                display: "flex",
                flexWrap: "wrap" as const,
                gap: "6px 16px",
              }}>
                {signalSources.map((s) => (
                  <li key={s} style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--ink-faint)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                  }}>
                    · {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier 2 */}
            <div style={{ marginBottom: "40px" }}>
              <h3 className="about-h3">Tier 2: Partner data.</h3>
              <p className="set-body">
                Temples that opt to partner with Deepam share insider signals
                voluntarily: monthly donation volume (percent change,
                not absolute figures), festival attendance counts, ritual
                material categories, priest tenure stability, and capital
                reserve status. Tier 2 signals are never made public. They
                improve model accuracy and validate that Tier 1 signals
                correlate with the financial reality they proxy.
              </p>
            </div>

            {/* MNAR */}
            <div>
              <h3 className="about-h3">The <span style={mono}>MNAR</span> mechanism.</h3>
              <p className="set-body" style={{ marginBottom: "16px" }}>
                The technically distinctive feature of the model is its
                treatment of missing observations. Standard approaches assume
                that whether an observation is recorded is independent of the
                underlying state (Missing At Random). For diaspora temples,
                this is structurally violated.
              </p>

              {/* Pull quote */}
              <div style={{ margin: "40px 0" }}>
                <hr className="rule-brass" />
                <blockquote style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic" as const,
                  fontSize: "clamp(20px, 3vw, 28px)",
                  fontWeight: 400,
                  color: "var(--oxblood)",
                  lineHeight: 1.45,
                  padding: "28px 0",
                  margin: 0,
                  quotes: "none",
                }}>
                  A temple that has not updated its Facebook page in eight months has not gone
                  missing at random. The absence of a Facebook post is itself a signal.
                </blockquote>
                <hr className="rule-brass" />
              </div>

              <p className="set-body">
                Deepam uses{" "}
                <span style={mono}>Missing Not At Random</span>
                {" "}(<span style={mono}>MNAR</span>) modeling, with
                state-dependent observation intensity factors. The presence or
                absence of an observation enters the inference recursion as
                evidence, not just noise. This is what the project means by{" "}
                <span style={mono}>MNAR-aware inference</span>.
              </p>
            </div>
          </section>

          <hr className="rule-brass" />

          {/* ── Known Confounders ── */}
          <section id="confounders" style={{ padding: "48px 0" }}>
            <h2 style={h2Style}>Known confounders.</h2>
            <p style={{ ...bodyStyle, marginBottom: "28px" }}>
              The mapping from observable digital signals to underlying financial
              state is not clean. Deepam is explicit about the confounders that
              can produce low Tier 1 signal at temples that are not under
              financial pressure.
            </p>

            <div>
              {confounders.map((item) => (
                <div key={item.title} className="about-confounder">
                  <h4 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "17px",
                    fontWeight: 400,
                    fontStyle: "italic" as const,
                    color: "var(--ink)",
                    marginBottom: "8px",
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ ...bodyStyle, fontSize: "15px" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <p style={{
              fontFamily: "var(--font-serif)",
              fontSize: "13px",
              color: "var(--ink-faint)",
              marginTop: "20px",
              lineHeight: 1.6,
            }}>
              When signal pattern is consistent with multiple confounders, the
              platform displays &ldquo;Insufficient Evidence&rdquo; rather than a forced label.
            </p>
          </section>

          <hr className="rule-brass" />

          {/* ── Ethics ── */}
          <section id="ethics" style={{ padding: "48px 0" }}>
            <h2 style={h2Style}>Framing and ethics.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p className="set-body">
                Deepam does not rank temples by religious quality, devotional
                rigor, or community importance. The states describe operational
                regimes under financial pressure, not statements about whether a
                temple is good, holy, or worth attending.
              </p>
              <p className="set-body">
                Every design decision in Deepam passes through a single test:
                would a board member of a flagged temple, reading the
                platform&apos;s description of their institution, recognize it
                as supportive rather than diagnostic?
              </p>
              <p className="set-body">
                All Tier 1 signals are public information accessible to any
                internet user. The ethical floor is higher than the legal floor:
                Deepam actively offers Tier 2 partnership to flagged temples and
                removes any temple from the platform unconditionally on board
                request.
              </p>
            </div>
          </section>

          <hr className="rule-brass" />

          {/* ── Partnership + Removal ── */}
          <section id="partner" style={{ padding: "48px 0 96px" }}>
            <h2 style={h2Style}>Partnership and ethics.</h2>

            {/* Tier 2 partnership */}
            <div style={{
              borderTop: "1px solid rgba(201,184,122,0.12)",
              borderBottom: "1px solid rgba(201,184,122,0.12)",
              padding: "28px 0",
              marginTop: "32px",
            }}>
              <h3 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "22px",
                fontWeight: 400,
                color: "var(--ink)",
                marginBottom: "12px",
              }}>
                Tier 2 partnership
              </h3>
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                color: "var(--ink-soft)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}>
                Temple boards that partner with Deepam receive a private
                dashboard showing the model&apos;s interpretation of their signals,
                see their financial data inform the calibration, and have
                direct contact with the project.
              </p>
              <a
                href="mailto:tanishchess@gmail.com?subject=Deepam Tier 2 Partnership"
                style={outlineCta}
              >
                Inquire about partnership
              </a>
            </div>

            {/* Removal request */}
            <div
              id="removal"
              style={{
                borderBottom: "1px solid rgba(201,184,122,0.12)",
                padding: "28px 0",
              }}
            >
              <h3 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "22px",
                fontWeight: 400,
                color: "var(--ink)",
                marginBottom: "12px",
              }}>
                Removal request
              </h3>
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                color: "var(--ink-soft)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}>
                Removal is unconditional. A temple board does not need to
                explain its reasoning. Response within 72 hours. The temple
                board&apos;s request is final.
              </p>
              <a
                href="mailto:tanishchess@gmail.com?subject=Deepam Removal Request"
                style={outlineCta}
              >
                Request removal
              </a>
            </div>
          </section>

          <Asterism />

        </div>
      </main>

      <Footer />
    </>
  );
}
