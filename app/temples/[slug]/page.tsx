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
  STATE_LABELS,
  STATE_COLORS,
  REGION_LABELS,
} from "@/data/temples";
import {
  MapPin,
  Phone,
  Globe,
  Calendar,
  ArrowLeft,
  Warning,
  Info,
  HandHeart,
} from "@phosphor-icons/react/dist/ssr";
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
  const color = STATE_COLORS[temple.deepamState];

  const needsSupport =
    temple.deepamState === "lightly-compromising" ||
    temple.deepamState === "seriously-compromising" ||
    temple.deepamState === "stripped-down";

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#0D0A07] pt-20 pb-24">
        {/* Back nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mb-6">
          <Link
            href="/temples"
            className="inline-flex items-center gap-2 text-sm text-[#78716C] hover:text-[#F97316] transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to all temples
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <div
                className="rounded-xl p-6 sm:p-8 border"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${color}08 0%, transparent 60%), #1A1410`,
                  borderColor: `${color}20`,
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <StateIndicator
                      state={temple.deepamState}
                      size="md"
                      className="mb-3"
                    />
                    <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-[#FAFAF9] leading-tight tracking-tight">
                      {temple.name}
                    </h1>
                  </div>
                  {/* Lamp */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15` }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: color,
                        boxShadow: `0 0 8px ${color}, 0 0 20px ${color}60`,
                      }}
                    />
                  </div>
                </div>

                <p className="text-[#A8A29E] text-base mb-6 leading-relaxed">
                  {temple.description}
                </p>

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 bg-[#241D16] rounded-lg p-3">
                    <MapPin
                      size={16}
                      weight="fill"
                      className="text-[#F97316] flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[10px] text-[#57534E] uppercase tracking-wide font-semibold mb-0.5">
                        Address
                      </p>
                      <p className="text-sm text-[#D6D3D1]">
                        {temple.address}, {temple.city}, NC {temple.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#241D16] rounded-lg p-3">
                    <Info
                      size={16}
                      weight="fill"
                      className="text-[#F97316] flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[10px] text-[#57534E] uppercase tracking-wide font-semibold mb-0.5">
                        Tradition
                      </p>
                      <p className="text-sm text-[#D6D3D1]">{temple.tradition}</p>
                    </div>
                  </div>

                  {temple.phone && (
                    <div className="flex items-start gap-3 bg-[#241D16] rounded-lg p-3">
                      <Phone
                        size={16}
                        weight="fill"
                        className="text-[#F97316] flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-[10px] text-[#57534E] uppercase tracking-wide font-semibold mb-0.5">
                          Phone
                        </p>
                        <a
                          href={`tel:${temple.phone}`}
                          className="text-sm text-[#D6D3D1] hover:text-[#F97316] transition-colors"
                        >
                          {temple.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {temple.website && (
                    <div className="flex items-start gap-3 bg-[#241D16] rounded-lg p-3">
                      <Globe
                        size={16}
                        weight="fill"
                        className="text-[#F97316] flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-[10px] text-[#57534E] uppercase tracking-wide font-semibold mb-0.5">
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
                          className="text-sm text-[#D6D3D1] hover:text-[#F97316] transition-colors break-all"
                        >
                          {temple.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 bg-[#241D16] rounded-lg p-3">
                    <Calendar
                      size={16}
                      weight="fill"
                      className="text-[#F97316] flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[10px] text-[#57534E] uppercase tracking-wide font-semibold mb-0.5">
                        Region
                      </p>
                      <p className="text-sm text-[#D6D3D1]">
                        {REGION_LABELS[temple.region]}
                      </p>
                    </div>
                  </div>

                  {temple.founded && (
                    <div className="flex items-start gap-3 bg-[#241D16] rounded-lg p-3">
                      <Info
                        size={16}
                        weight="fill"
                        className="text-[#F97316] flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-[10px] text-[#57534E] uppercase tracking-wide font-semibold mb-0.5">
                          Founded
                        </p>
                        <p className="text-sm text-[#D6D3D1]">{temple.founded}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Deepam state assessment */}
              <div className="bg-[#1A1410] border border-[rgba(249,115,22,0.1)] rounded-xl p-6">
                <h2 className="font-display text-xl font-semibold text-[#FAFAF9] mb-3">
                  Deepam assessment
                </h2>
                <div
                  className="rounded-lg p-4 mb-4"
                  style={{ background: `${color}10`, border: `1px solid ${color}20` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                    />
                    <span
                      className="text-sm font-semibold font-body"
                      style={{ color }}
                    >
                      {STATE_LABELS[temple.deepamState]}
                    </span>
                  </div>
                  <p className="text-sm text-[#A8A29E] leading-relaxed">
                    {temple.stateNote}
                  </p>
                </div>

                {!temple.hasSufficientEvidence && (
                  <div className="flex items-start gap-3 bg-[rgba(87,83,78,0.15)] border border-[rgba(87,83,78,0.2)] rounded-lg p-3">
                    <Warning
                      size={16}
                      weight="fill"
                      className="text-[#78716C] flex-shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-[#78716C] leading-relaxed">
                      State estimate has wide uncertainty band due to low public
                      signal volume or linguistic-isolation confounders. A Tier 2
                      partnership would resolve this ambiguity.
                    </p>
                  </div>
                )}

                {temple.tier2Partner && (
                  <div className="flex items-center gap-2 mt-3 text-xs text-[#F59E0B] bg-[rgba(245,158,11,0.08)] rounded-lg px-3 py-2 border border-[rgba(245,158,11,0.15)]">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#F59E0B" }}
                    />
                    Tier 2 partner — financial signals supplement this estimate
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="bg-[#1A1410] border border-[rgba(249,115,22,0.1)] rounded-xl p-4">
                <h2 className="font-display text-xl font-semibold text-[#FAFAF9] mb-3">
                  Location
                </h2>
                <NCMapClient
                  temples={[temple]}
                  selectedId={temple.id}
                  height="260px"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* How to help */}
              <div className="bg-[#1A1410] border border-[rgba(249,115,22,0.15)] rounded-xl p-5">
                <h2 className="font-display text-xl font-semibold text-[#FAFAF9] mb-1">
                  How to help
                </h2>
                <p className="text-xs text-[#78716C] mb-4 leading-relaxed">
                  Sustained engagement changes the trajectory. Pledge to attend,
                  donate, or reach out to volunteer.
                </p>

                {/* Events with pledges */}
                {temple.events.length > 0 ? (
                  <div className="space-y-4">
                    {temple.events.map((event) => {
                      const pd = pledgeCounts[event.name] ?? {
                        count: 0,
                        publicNames: [],
                      };
                      return (
                        <div
                          key={event.name}
                          className="border border-[rgba(249,115,22,0.1)] rounded-lg p-4 bg-[#241D16]"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <p className="text-sm font-semibold text-[#FAFAF9]">
                                {event.name}
                              </p>
                              {event.description && (
                                <p className="text-xs text-[#78716C] mt-0.5">
                                  {event.description}
                                </p>
                              )}
                            </div>
                            {pd.count > 0 && (
                              <span className="text-xs bg-[rgba(249,115,22,0.1)] text-[#FB923C] rounded-full px-2 py-0.5 font-semibold flex-shrink-0">
                                {pd.count} pledged
                              </span>
                            )}
                          </div>
                          {pd.publicNames.length > 0 && (
                            <p className="text-[10px] text-[#57534E] mb-3">
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
                  <div className="text-center py-6 border border-dashed border-[rgba(249,115,22,0.1)] rounded-lg">
                    <HandHeart
                      size={24}
                      weight="fill"
                      className="mx-auto mb-2 text-[#57534E]"
                    />
                    <p className="text-xs text-[#57534E]">
                      No upcoming events listed.
                    </p>
                  </div>
                )}

                {/* Donate link */}
                {temple.website && (
                  <a
                    href={
                      temple.website.startsWith("http")
                        ? temple.website
                        : `https://${temple.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost w-full text-center flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <Globe size={14} />
                    Visit temple website
                  </a>
                )}
              </div>

              {/* Board contact */}
              <div className="bg-[#1A1410] border border-[rgba(249,115,22,0.08)] rounded-xl p-5">
                <h3 className="font-display text-base font-semibold text-[#FAFAF9] mb-2">
                  Temple board
                </h3>
                <p className="text-xs text-[#78716C] leading-relaxed mb-3">
                  If you're a temple board member and want to partner with
                  Deepam (Tier 2) or request changes to this profile:
                </p>
                <a
                  href="mailto:tanishchess@gmail.com"
                  className="text-xs text-[#F97316] hover:underline cursor-pointer"
                >
                  Contact the project
                </a>
              </div>

              {/* Ethics note */}
              <div className="bg-[#241D16] border border-[rgba(87,83,78,0.2)] rounded-xl p-4">
                <p className="text-[10px] text-[#57534E] leading-relaxed">
                  All data used for this profile is publicly accessible. Temple
                  boards may request removal from this platform at any time,
                  unconditionally and without explanation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
