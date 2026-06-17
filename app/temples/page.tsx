"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import dynamic from "next/dynamic";
import {
  temples,
  type Region,
  type DeepamState,
  REGION_LABELS,
  STATE_LABELS,
} from "@/data/temples";

const NCMapClient = dynamic(() => import("@/components/NCMapClient"), {
  ssr: false,
});

const STATE_CHIPS: Array<{ value: DeepamState | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "sustaining", label: "Sustaining" },
  { value: "lightly-compromising", label: "Tightening" },
  { value: "seriously-compromising", label: "Cutting Back" },
  { value: "stripped-down", label: "At Minimum" },
  { value: "insufficient-evidence", label: "Unknown" },
];

const REGION_CHIPS: Array<{ value: Region | "all"; label: string }> = [
  { value: "all", label: "All Regions" },
  { value: "triangle", label: REGION_LABELS.triangle },
  { value: "charlotte", label: REGION_LABELS.charlotte },
  { value: "triad", label: REGION_LABELS.triad },
  { value: "fayetteville", label: REGION_LABELS.fayetteville },
  { value: "eastern-nc", label: REGION_LABELS["eastern-nc"] },
  { value: "western-nc", label: REGION_LABELS["western-nc"] },
  { value: "emerging", label: REGION_LABELS.emerging },
];

function TemplesContent() {
  const searchParams = useSearchParams();
  const initialRegion = (searchParams.get("region") as Region) || "all";

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<Region | "all">(
    initialRegion
  );
  const [stateFilter, setStateFilter] = useState<DeepamState | "all">("all");
  const [view, setView] = useState<"list" | "map">("list");

  const filtered = useMemo(() => {
    return temples.filter((t) => {
      if (regionFilter !== "all" && t.region !== regionFilter) return false;
      if (stateFilter !== "all" && t.deepamState !== stateFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q) ||
          t.tradition.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, regionFilter, stateFilter]);

  const hasFilters =
    search.trim() !== "" || regionFilter !== "all" || stateFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setRegionFilter("all");
    setStateFilter("all");
  };

  return (
    <>
      <style>{`.explore-search::placeholder { color: var(--ink-faint); font-style: italic; }`}</style>
      <Navigation />

      <main style={{ minHeight: "100vh", background: "var(--paper)" }}>
        {/* Header */}
        <section
          style={{ paddingTop: "calc(68px + 52px)", paddingBottom: "36px" }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 500,
                fontVariant: "small-caps",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brass)",
                marginBottom: "18px",
              }}
            >
              No. 27 · The Records
            </p>

            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 5vw, 62px)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontVariationSettings: '"opsz" 144',
                marginBottom: "18px",
              }}
            >
              Twenty-six community institutions.
            </h1>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "17px",
                color: "var(--ink-muted)",
                lineHeight: 1.5,
                maxWidth: "52ch",
              }}
            >
              Each tracked by Deepam&apos;s probabilistic state model. The model
              updates monthly.
            </p>
          </div>
        </section>

        {/* Sticky filters */}
        <div
          style={{
            position: "sticky",
            top: "68px",
            zIndex: 30,
            background: "rgba(14,22,38,0.92)",
            borderBottom: "1px solid rgba(201,184,122,0.12)",
            padding: "16px 0",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6">
            {/* Search */}
            <div style={{ marginBottom: "14px" }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a name, a city, a tradition…"
                className="explore-search"
                style={{
                  width: "100%",
                  background: "var(--paper-warm)",
                  border: "1px solid rgba(201,184,122,0.25)",
                  borderRadius: "2px",
                  padding: "9px 14px",
                  fontFamily: "var(--font-serif)",
                  fontStyle: search ? "normal" : "italic",
                  fontSize: "15px",
                  color: "var(--ink)",
                  outline: "none",
                  boxSizing: "border-box",
                  maxWidth: "520px",
                }}
              />
            </div>

            {/* State filter chips */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              {STATE_CHIPS.map(({ value, label }) => {
                const count =
                  value === "all"
                    ? temples.length
                    : temples.filter((t) => t.deepamState === value).length;
                const active = stateFilter === value;
                return (
                  <button
                    key={value}
                    onClick={() => setStateFilter(value)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontVariant: "small-caps",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: active ? "var(--ink)" : "var(--ink-muted)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: active ? "underline" : "none",
                      textDecorationColor: "var(--oxblood)",
                      textUnderlineOffset: "4px",
                      textDecorationThickness: "1px",
                    }}
                  >
                    {label}{" "}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                      }}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Region filter chips */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              {REGION_CHIPS.map(({ value, label }) => {
                const count =
                  value === "all"
                    ? temples.length
                    : temples.filter((t) => t.region === value).length;
                const active = regionFilter === value;
                return (
                  <button
                    key={value}
                    onClick={() => setRegionFilter(value)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontVariant: "small-caps",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: active ? "var(--ink)" : "var(--ink-muted)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: active ? "underline" : "none",
                      textDecorationColor: "var(--oxblood)",
                      textUnderlineOffset: "4px",
                      textDecorationThickness: "1px",
                    }}
                  >
                    {label}{" "}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                      }}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Result count + view toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--ink-faint)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {filtered.length} of {temples.length} shown
                {hasFilters && " · matching your filters"}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                }}
              >
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "13px",
                      color: "var(--oxblood)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Reset filters
                  </button>
                )}

                {/* View toggle */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {(["list", "map"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontVariant: "small-caps",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color:
                          view === v ? "var(--ink)" : "var(--ink-muted)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        textDecoration: view === v ? "underline" : "none",
                        textDecorationColor: "var(--brass)",
                        textUnderlineOffset: "4px",
                        textDecorationThickness: "1px",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ paddingBottom: "96px" }}>
          <div className="max-w-4xl mx-auto px-6">
            {/* Map view */}
            {view === "map" && (
              <div style={{ margin: "32px 0 48px" }}>
                <NCMapClient temples={filtered} height="480px" />
                <p
                  style={{
                    marginTop: "12px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--ink-faint)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Showing {filtered.length} temples.{" "}
                  <Link
                    href="/map"
                    style={{
                      color: "var(--oxblood)",
                      textDecoration: "none",
                      fontStyle: "italic",
                      fontFamily: "var(--font-serif)",
                      fontSize: "12px",
                      textTransform: "none",
                      letterSpacing: 0,
                    }}
                  >
                    View the full atlas →
                  </Link>
                </p>
              </div>
            )}

            {/* List view */}
            {view === "list" && (
              <>
                {filtered.length === 0 ? (
                  <div
                    style={{
                      padding: "80px 0",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "17px",
                        color: "var(--ink-muted)",
                      }}
                    >
                      No temples match your current filters.
                    </p>
                    <button
                      onClick={clearFilters}
                      style={{
                        marginTop: "16px",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "15px",
                        color: "var(--oxblood)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div style={{ marginTop: "32px" }}>
                    {filtered.map((temple, i) => (
                      <TempleCard
                        key={temple.id}
                        temple={temple}
                        index={i + 1}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function TemplesPage() {
  return (
    <Suspense fallback={null}>
      <TemplesContent />
    </Suspense>
  );
}
