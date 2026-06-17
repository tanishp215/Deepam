import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StateIndicator from "@/components/StateIndicator";
import PledgeForm from "@/components/PledgeForm";
import NCMapClient from "@/components/NCMapClient";
import {
  getTempleById,
  temples,
  REGION_LABELS,
} from "@/data/temples";
import { prisma } from "@/lib/db";

export async function generateStaticParams() {
  return temples.map((t) => ({ slug: t.id }));
}

interface PledgeData {
  count: number;
  publicNames: string[];
}

async function getPledgeCounts(
  templeId: string
): Promise<Record<string, PledgeData>> {
  try {
    const pledges = await prisma.pledge.findMany({
      where: { templeId },
      select: { eventName: true, name: true, isPublic: true },
    });
    const byEvent: Record<string, PledgeData> = {};
    for (const p of pledges) {
      if (!byEvent[p.eventName]) {
        byEvent[p.eventName] = { count: 0, publicNames: [] };
      }
      byEvent[p.eventName].count++;
      if (p.isPublic) byEvent[p.eventName].publicNames.push(p.name);
    }
    return byEvent;
  } catch {
    return {};
  }
}

export default async function TempleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const temple = getTempleById(slug);
  if (!temple) notFound();

  const pledgeCounts = await getPledgeCounts(temple.id);
  const templeIndex = temples.findIndex((t) => t.id === temple.id);

  const backLink = (
    <Link
      href="/temples"
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
        color: "var(--ink-faint)",
        textDecoration: "none",
        letterSpacing: "0.04em",
        display: "inline-block",
        marginBottom: "32px",
      }}
    >
      &larr; Back to all records
    </Link>
  );

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div
          className="max-w-5xl mx-auto px-6"
          style={{ paddingTop: "calc(68px + 52px)", paddingBottom: "96px" }}
        >
          {/* Back link */}
          {backLink}

          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            {/* Overline */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "12px",
              }}
            >
              No. {String(templeIndex + 1).padStart(3, "0")} &middot;{" "}
              {REGION_LABELS[temple.region]}
            </p>

            {/* Display name */}
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(48px, 7vw, 72px)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontVariationSettings: '"opsz" 144',
                maxWidth: "20ch",
                marginBottom: "16px",
              }}
            >
              {temple.name}
            </h1>

            {/* Tradition + city */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "18px",
                color: "var(--ink-muted)",
                marginBottom: "20px",
              }}
            >
              {temple.tradition} &middot; {temple.city}, NC
            </p>

            {/* State indicator */}
            <StateIndicator state={temple.deepamState} showLabel size="md" />

            {/* Brass rule */}
            <hr
              className="rule-brass"
              style={{ margin: "32px 0 40px" }}
            />
          </div>

          {/* Two-column body */}
          <div
            className="lg:grid lg:grid-cols-[3fr_1fr]"
            style={{ gap: "48px" }}
          >
            {/* Left column */}
            <div>
              {/* Deepam assessment */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  marginBottom: "12px",
                }}
              >
                Deepam assessment
              </p>
              <p
                className="set-body"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "17px",
                  color: "var(--ink-soft)",
                  lineHeight: 1.65,
                  marginBottom: "20px",
                }}
              >
                {temple.stateNote}
              </p>

              {/* Insufficient evidence note */}
              {!temple.hasSufficientEvidence && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--ink-faint)",
                    lineHeight: 1.6,
                    borderLeft: "2px solid var(--brass)",
                    paddingLeft: "14px",
                    marginBottom: "16px",
                  }}
                >
                  State estimate has wide uncertainty band due to low public
                  signal volume or linguistic-isolation confounders. A Tier 2
                  partnership would resolve this ambiguity.
                </p>
              )}

              {/* Tier 2 partner */}
              {temple.tier2Partner && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    color: "var(--brass)",
                    marginBottom: "16px",
                  }}
                >
                  &#9670; Tier 2 partner
                </p>
              )}

              {/* Divider */}
              <hr className="rule-brass" style={{ margin: "32px 0" }} />

              {/* Events + PledgeForm */}
              {temple.events.length > 0 ? (
                <div>
                  {temple.events.map((event) => {
                    const pd = pledgeCounts[event.name] ?? {
                      count: 0,
                      publicNames: [],
                    };
                    return (
                      <div
                        key={event.name}
                        style={{
                          borderTop: "1px solid rgba(201,184,122,0.12)",
                          paddingTop: "24px",
                          paddingBottom: "24px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "17px",
                            fontWeight: 400,
                            color: "var(--ink)",
                            marginBottom: "6px",
                          }}
                        >
                          {event.name}
                        </p>
                        {event.description && (
                          <p
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontStyle: "italic",
                              fontSize: "14px",
                              color: "var(--ink-muted)",
                              marginBottom: "10px",
                            }}
                          >
                            {event.description}
                          </p>
                        )}
                        {pd.count > 0 && (
                          <p
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "11px",
                              color: "var(--brass)",
                              letterSpacing: "0.04em",
                              marginBottom: "4px",
                            }}
                          >
                            {pd.count}{" "}
                            {pd.count === 1 ? "person" : "people"} pledged
                          </p>
                        )}
                        {pd.publicNames.length > 0 && (
                          <p
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              color: "var(--ink-faint)",
                              marginBottom: "16px",
                            }}
                          >
                            {pd.publicNames.slice(0, 3).join(", ")}
                            {pd.publicNames.length > 3
                              ? ` and ${pd.publicNames.length - 3} more`
                              : ""}
                          </p>
                        )}
                        <PledgeForm
                          templeId={temple.id}
                          eventName={event.name}
                          pledgeCount={pd.count}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "15px",
                    color: "var(--ink-faint)",
                    marginBottom: "32px",
                  }}
                >
                  No upcoming events listed for this temple.
                </p>
              )}

              {/* Divider before map */}
              <hr className="rule-brass" style={{ margin: "32px 0" }} />

              {/* Location map */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  marginBottom: "16px",
                }}
              >
                Location
              </p>
              <NCMapClient
                temples={[temple]}
                selectedId={temple.id}
                height="240px"
              />
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--ink-faint)",
                  marginTop: "10px",
                  letterSpacing: "0.03em",
                }}
              >
                {temple.address}, {temple.city}, NC {temple.zip}
              </p>
            </div>

            {/* Right column: sidebar */}
            <aside>
              {/* Region */}
              <div
                style={{
                  borderTop: "1px solid rgba(201,184,122,0.18)",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    marginBottom: "4px",
                  }}
                >
                  Region
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: "var(--ink-soft)",
                  }}
                >
                  {REGION_LABELS[temple.region]}
                </p>
              </div>

              {/* Founded */}
              {temple.founded && (
                <div
                  style={{
                    borderTop: "1px solid rgba(201,184,122,0.18)",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      marginBottom: "4px",
                    }}
                  >
                    Founded
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {temple.founded}
                  </p>
                </div>
              )}

              {/* Tradition */}
              <div
                style={{
                  borderTop: "1px solid rgba(201,184,122,0.18)",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    marginBottom: "4px",
                  }}
                >
                  Tradition
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: "var(--ink-soft)",
                  }}
                >
                  {temple.tradition}
                </p>
              </div>

              {/* Phone */}
              {temple.phone && (
                <div
                  style={{
                    borderTop: "1px solid rgba(201,184,122,0.18)",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      marginBottom: "4px",
                    }}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${temple.phone}`}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "var(--ink-soft)",
                      textDecoration: "none",
                    }}
                  >
                    {temple.phone}
                  </a>
                </div>
              )}

              {/* Website */}
              {temple.website && (
                <div
                  style={{
                    borderTop: "1px solid rgba(201,184,122,0.18)",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      marginBottom: "4px",
                    }}
                  >
                    Website
                  </p>
                  <a
                    href={
                      temple.website.startsWith("http")
                        ? temple.website
                        : `https://${temple.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "13px",
                      color: "var(--oxblood)",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    {temple.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}

              {/* Board contact */}
              <div
                style={{
                  borderTop: "1px solid rgba(201,184,122,0.18)",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    marginBottom: "8px",
                  }}
                >
                  Temple board
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    color: "var(--ink-faint)",
                    lineHeight: 1.6,
                    marginBottom: "10px",
                  }}
                >
                  Board members may request a Tier 2 partnership or corrections
                  to this profile.
                </p>
                <a
                  href="mailto:tanishchess@gmail.com"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    color: "var(--oxblood)",
                    border: "1px solid var(--oxblood)",
                    borderRadius: "2px",
                    padding: "5px 10px",
                    textDecoration: "none",
                    display: "inline-block",
                    letterSpacing: "0.02em",
                  }}
                >
                  Contact the project
                </a>
              </div>

              {/* Ethics note */}
              <div
                style={{
                  borderTop: "1px solid rgba(201,184,122,0.18)",
                  paddingTop: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: "var(--ink-faint)",
                    lineHeight: 1.7,
                    letterSpacing: "0.02em",
                  }}
                >
                  All data used for this profile is publicly accessible. Temple
                  boards may request removal from this platform at any time,
                  unconditionally and without explanation.
                </p>
              </div>
            </aside>
          </div>

          {/* Bottom rule + back link */}
          <hr className="rule-brass" style={{ marginTop: "64px", marginBottom: "32px" }} />
          {backLink}
        </div>
      </main>
      <Footer />
    </>
  );
}
