"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TempleCard from "@/components/TempleCard";
import NCMapClient from "@/components/NCMapClient";
import { StateDot } from "@/components/StateIndicator";
import {
  temples,
  type Region,
  type DeepamState,
  REGION_LABELS,
  STATE_LABELS,
  STATE_COLORS,
} from "@/data/temples";
import { Search, X, Map, LayoutList } from "lucide-react";
import { Suspense } from "react";

const ALL_REGIONS: Array<{ value: Region | "all"; label: string }> = [
  { value: "all", label: "All Regions" },
  { value: "triangle", label: REGION_LABELS.triangle },
  { value: "charlotte", label: REGION_LABELS.charlotte },
  { value: "triad", label: REGION_LABELS.triad },
  { value: "fayetteville", label: REGION_LABELS.fayetteville },
  { value: "eastern-nc", label: REGION_LABELS["eastern-nc"] },
  { value: "western-nc", label: REGION_LABELS["western-nc"] },
  { value: "emerging", label: REGION_LABELS.emerging },
];

const ALL_STATES: Array<{ value: DeepamState | "all"; label: string }> = [
  { value: "all", label: "All States" },
  { value: "sustaining", label: STATE_LABELS.sustaining },
  { value: "lightly-compromising", label: STATE_LABELS["lightly-compromising"] },
  { value: "seriously-compromising", label: STATE_LABELS["seriously-compromising"] },
  { value: "insufficient-evidence", label: STATE_LABELS["insufficient-evidence"] },
];

function TemplesContent() {
  const searchParams = useSearchParams();
  const initialRegion = (searchParams.get("region") as Region) || "all";

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<Region | "all">(initialRegion);
  const [stateFilter, setStateFilter] = useState<DeepamState | "all">("all");
  const [view, setView] = useState<"list" | "map">("list");

  const filtered = useMemo(() => {
    return temples.filter((t) => {
      if (
        regionFilter !== "all" &&
        t.region !== regionFilter
      )
        return false;
      if (
        stateFilter !== "all" &&
        t.deepamState !== stateFilter
      )
        return false;
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
    search.trim() !== "" ||
    regionFilter !== "all" ||
    stateFilter !== "all";

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#0D0A07] pt-[68px] pb-24">
        {/* Page header */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 relative"
          style={{
            background:
              "radial-gradient(ellipse 50% 160px at 0% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: "#F97316",
                boxShadow: "0 0 6px rgba(249,115,22,0.9), 0 0 18px rgba(249,115,22,0.4)",
              }}
            />
            <span className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.12em]">
              North Carolina
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#FAFAF9] tracking-tight mb-2"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Explore NC temples
          </h1>
          <p className="text-[#78716C] text-base max-w-xl leading-relaxed">
            {temples.length} Hindu community institutions across North Carolina,
            each tracked by Deepam&apos;s probabilistic state model.
          </p>
        </div>

        {/* Filters bar */}
        <div className="sticky top-16 z-30 bg-[#0D0A07]/95 backdrop-blur-md border-b border-[rgba(249,115,22,0.08)] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-0 max-w-sm">
                <Search
                  size={14}
                  strokeWidth={2}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search temples, cities, traditions..."
                  className="w-full bg-[#1A1410] border border-[rgba(249,115,22,0.15)] rounded-lg pl-9 pr-4 py-2 text-sm text-[#FAFAF9] placeholder-[#57534E] focus:outline-none focus:border-[rgba(249,115,22,0.4)] transition-colors"
                  aria-label="Search temples"
                />
              </div>

              {/* Region filter */}
              <select
                value={regionFilter}
                onChange={(e) =>
                  setRegionFilter(e.target.value as Region | "all")
                }
                className="bg-[#1A1410] border border-[rgba(249,115,22,0.15)] rounded-lg px-3 py-2 text-sm text-[#D6D3D1] focus:outline-none focus:border-[rgba(249,115,22,0.4)] cursor-pointer transition-colors"
                aria-label="Filter by region"
              >
                {ALL_REGIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>

              {/* State filter */}
              <select
                value={stateFilter}
                onChange={(e) =>
                  setStateFilter(e.target.value as DeepamState | "all")
                }
                className="bg-[#1A1410] border border-[rgba(249,115,22,0.15)] rounded-lg px-3 py-2 text-sm text-[#D6D3D1] focus:outline-none focus:border-[rgba(249,115,22,0.4)] cursor-pointer transition-colors"
                aria-label="Filter by state"
              >
                {ALL_STATES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              {/* Clear filters */}
              {hasFilters && (
                <button
                  onClick={() => {
                    setSearch("");
                    setRegionFilter("all");
                    setStateFilter("all");
                  }}
                  className="flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#F97316] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <X size={12} strokeWidth={2} />
                  Clear filters
                </button>
              )}

              {/* View toggle */}
              <div className="ml-auto flex items-center bg-[#1A1410] border border-[rgba(249,115,22,0.15)] rounded-lg p-0.5">
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    view === "list"
                      ? "bg-[rgba(249,115,22,0.15)] text-[#F97316]"
                      : "text-[#57534E] hover:text-[#A8A29E]"
                  }`}
                  aria-label="List view"
                >
                  <LayoutList size={16} strokeWidth={2} />
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    view === "map"
                      ? "bg-[rgba(249,115,22,0.15)] text-[#F97316]"
                      : "text-[#57534E] hover:text-[#A8A29E]"
                  }`}
                  aria-label="Map view"
                >
                  <Map size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Result count */}
            <p className="text-xs text-[#57534E] mt-2 font-body">
              {filtered.length} temple{filtered.length !== 1 ? "s" : ""}
              {hasFilters ? " matching your filters" : " in North Carolina"}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
          {/* Map view */}
          {view === "map" && (
            <div className="mb-8">
              <NCMapClient temples={filtered} height="500px" />
            </div>
          )}

          {/* List view */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(87,83,78,0.15)" }}
              >
                <Search size={22} className="text-[#57534E]" />
              </div>
              <p className="text-[#78716C] font-body">
                No temples found for your filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setRegionFilter("all");
                  setStateFilter("all");
                }}
                className="mt-3 text-sm text-[#F97316] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>
          )}
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
