"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search, X, MapPin, Globe, ChevronDown } from "lucide-react";
import {
  temples,
  getActiveTemples,
  getTemplesByState,
  type Region,
  type DeepamState,
  REGION_LABELS,
  STATE_LABELS,
  STATE_COLORS,
} from "@/data/temples";
import StateIndicator from "@/components/StateIndicator";

const NCMap = dynamic(() => import("@/components/NCMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0D0A07] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="loader" />
        <p className="text-[13px] text-[#57534E] tracking-wide">Loading map</p>
      </div>
    </div>
  ),
});

const ALL_REGIONS: Array<{ value: Region | "all"; label: string }> = [
  { value: "all", label: "All regions" },
  { value: "triangle", label: REGION_LABELS.triangle },
  { value: "charlotte", label: REGION_LABELS.charlotte },
  { value: "triad", label: REGION_LABELS.triad },
  { value: "fayetteville", label: REGION_LABELS.fayetteville },
  { value: "eastern-nc", label: REGION_LABELS["eastern-nc"] },
  { value: "western-nc", label: REGION_LABELS["western-nc"] },
];

const LEGEND_STATES: DeepamState[] = [
  "sustaining",
  "lightly-compromising",
  "seriously-compromising",
  "stripped-down",
  "insufficient-evidence",
];

export default function MapHero() {
  const [selectedId, setSelectedId]     = useState<string | null>(null);
  const [search, setSearch]             = useState("");
  const [regionFilter, setRegionFilter] = useState<Region | "all">("all");
  const [stateFilter, setStateFilter]   = useState<DeepamState | "all">("all");

  const activeTemples   = getActiveTemples();
  const sustainingCount = getTemplesByState("sustaining").length;
  const attentionCount  =
    getTemplesByState("lightly-compromising").length +
    getTemplesByState("seriously-compromising").length;

  const filtered = useMemo(() => {
    return activeTemples.filter((t) => {
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
  }, [activeTemples, search, regionFilter, stateFilter]);

  const selectedTemple = selectedId
    ? (temples.find((t) => t.id === selectedId) ?? null)
    : null;

  const hasFilters =
    search.trim() !== "" || regionFilter !== "all" || stateFilter !== "all";

  function clearFilters() {
    setSearch("");
    setRegionFilter("all");
    setStateFilter("all");
  }

  const selectClass =
    "bg-[rgba(13,10,7,0.88)] backdrop-blur-md border border-[rgba(249,115,22,0.15)] rounded-[6px] px-2.5 py-1.5 text-[12px] text-[#A8A29E] focus:outline-none focus:border-[rgba(249,115,22,0.4)] cursor-pointer transition-colors appearance-none pr-6";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100dvh - 68px)" }}
    >
      {/* ── Full-screen map ── */}
      <NCMap
        temples={filtered}
        selectedId={selectedId ?? undefined}
        onSelect={setSelectedId}
        height="100%"
      />

      {/* ════════════════════════════════════
          TOP-LEFT — Branding + count
      ════════════════════════════════════ */}
      <div className="absolute top-[84px] left-4 z-[1000] pointer-events-none select-none">
        <p
          className="font-display font-bold text-[#FAFAF9]"
          style={{ fontSize: "clamp(1.1rem, 2vw, 22px)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
        >
          NC&apos;s diaspora temples
        </p>
        <p className="text-[11px] text-[#57534E] mt-1">
          {hasFilters
            ? `${filtered.length} of ${activeTemples.length} temples`
            : `${activeTemples.length} temples across North Carolina`}
        </p>
      </div>

      {/* ════════════════════════════════════
          TOP-RIGHT — Search + filters
      ════════════════════════════════════ */}
      <div className="absolute top-[84px] right-4 z-[1000] flex flex-col items-end gap-2">
        {/* Search */}
        <div className="relative">
          <Search
            size={12}
            strokeWidth={2}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search temples, cities..."
            className="bg-[rgba(13,10,7,0.88)] backdrop-blur-md border border-[rgba(249,115,22,0.15)] rounded-[6px] pl-7 pr-7 py-1.5 text-[12px] text-[#FAFAF9] placeholder-[#57534E] focus:outline-none focus:border-[rgba(249,115,22,0.4)] w-52 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#57534E] hover:text-[#A8A29E] transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X size={11} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as Region | "all")}
              className={selectClass}
              aria-label="Filter by region"
            >
              {ALL_REGIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown size={10} strokeWidth={2} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value as DeepamState | "all")}
              className={selectClass}
              aria-label="Filter by state"
            >
              <option value="all">All states</option>
              {LEGEND_STATES.map((s) => (
                <option key={s} value={s}>
                  {STATE_LABELS[s]}
                </option>
              ))}
            </select>
            <ChevronDown size={10} strokeWidth={2} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#57534E] pointer-events-none" />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="bg-[rgba(13,10,7,0.88)] backdrop-blur-md border border-[rgba(249,115,22,0.15)] rounded-[6px] px-2.5 py-1.5 text-[11px] text-[#78716C] hover:text-[#F97316] hover:border-[rgba(249,115,22,0.35)] transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════
          BOTTOM-LEFT — Stats
      ════════════════════════════════════ */}
      <div
        className="absolute z-[1000] transition-all duration-300"
        style={{
          bottom: selectedTemple ? "calc(176px + 16px)" : "16px",
          left: "16px",
        }}
      >
        <div className="bg-[rgba(13,10,7,0.88)] backdrop-blur-md border border-[rgba(249,115,22,0.12)] rounded-[8px] px-4 py-3">
          <div className="flex items-center gap-5">
            <div>
              <p
                className="font-display font-bold text-[#FAFAF9] tabular-nums"
                style={{ fontSize: "20px", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {activeTemples.length}
              </p>
              <p className="text-[9px] text-[#57534E] mt-1 uppercase tracking-[0.1em]">tracked</p>
            </div>
            <div className="w-px h-8 bg-[rgba(249,115,22,0.12)]" />
            <div>
              <p
                className="font-display font-bold tabular-nums"
                style={{ fontSize: "20px", lineHeight: 1, letterSpacing: "-0.03em", color: "#10B981" }}
              >
                {sustainingCount}
              </p>
              <p className="text-[9px] text-[#57534E] mt-1 uppercase tracking-[0.1em]">sustaining</p>
            </div>
            <div className="w-px h-8 bg-[rgba(249,115,22,0.12)]" />
            <div>
              <p
                className="font-display font-bold tabular-nums"
                style={{ fontSize: "20px", lineHeight: 1, letterSpacing: "-0.03em", color: "#F97316" }}
              >
                {attentionCount}
              </p>
              <p className="text-[9px] text-[#57534E] mt-1 uppercase tracking-[0.1em]">need attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          BOTTOM-RIGHT — Legend (interactive)
      ════════════════════════════════════ */}
      <div
        className="absolute z-[1000] transition-all duration-300"
        style={{
          bottom: selectedTemple ? "calc(176px + 16px)" : "16px",
          right: "16px",
        }}
      >
        <div className="bg-[rgba(13,10,7,0.88)] backdrop-blur-md border border-[rgba(249,115,22,0.12)] rounded-[8px] p-3">
          <p className="text-[9px] font-semibold text-[#57534E] uppercase tracking-[0.12em] mb-2.5">
            Operational state
          </p>
          <div className="flex flex-col gap-1">
            {LEGEND_STATES.map((state) => {
              const active = stateFilter === "all" || stateFilter === state;
              return (
                <button
                  key={state}
                  onClick={() => setStateFilter(stateFilter === state ? "all" : state)}
                  className="flex items-center gap-2 text-left cursor-pointer transition-opacity"
                  style={{ opacity: active ? 1 : 0.3 }}
                  aria-pressed={stateFilter === state}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: STATE_COLORS[state] }}
                  />
                  <span className="text-[11px] text-[#A8A29E]">{STATE_LABELS[state]}</span>
                  <span className="ml-auto text-[10px] text-[#57534E] tabular-nums pl-3">
                    {temples.filter((t) => t.deepamState === state).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          BOTTOM — Temple info drawer
      ════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1002] transition-transform duration-300 ease-out"
        style={{
          transform: selectedTemple ? "translateY(0)" : "translateY(100%)",
        }}
        aria-hidden={!selectedTemple}
      >
        {selectedTemple && (
          <div className="bg-[rgba(10,8,5,0.97)] backdrop-blur-xl border-t border-[rgba(249,115,22,0.18)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <div className="flex items-start gap-5">

                {/* State + Name */}
                <div className="flex-1 min-w-0">
                  <StateIndicator state={selectedTemple.deepamState} size="sm" className="mb-2" />
                  <h2
                    className="font-display font-bold text-[#FAFAF9] truncate"
                    style={{ fontSize: "clamp(1rem, 2vw, 20px)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
                  >
                    {selectedTemple.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <MapPin size={11} strokeWidth={1.75} className="text-[#57534E]" />
                      <span className="text-[12px] text-[#78716C]">
                        {selectedTemple.city}, NC
                      </span>
                    </div>
                    <span className="text-[#3A3430]">·</span>
                    <span className="text-[12px] text-[#78716C]">{selectedTemple.tradition}</span>
                  </div>
                </div>

                {/* State assessment note — hidden on mobile */}
                <div className="hidden md:block flex-1 min-w-0">
                  <p className="text-[13px] text-[#A8A29E] leading-relaxed line-clamp-2">
                    {selectedTemple.stateNote}
                  </p>
                  {selectedTemple.website && (
                    <a
                      href={
                        selectedTemple.website.startsWith("http")
                          ? selectedTemple.website
                          : `https://${selectedTemple.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 mt-1.5 text-[11px] text-[#78716C] hover:text-[#F97316] transition-colors"
                    >
                      <Globe size={10} strokeWidth={1.75} />
                      {selectedTemple.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 flex-shrink-0 self-center">
                  <Link href={`/temples/${selectedTemple.id}`} className="btn-primary">
                    View profile
                  </Link>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="w-7 h-7 flex items-center justify-center rounded-[5px] border border-[rgba(249,115,22,0.15)] text-[#57534E] hover:text-[#A8A29E] hover:border-[rgba(249,115,22,0.3)] transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={13} strokeWidth={2} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll hint — only shows when nothing is selected */}
      {!selectedTemple && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[999] pointer-events-none select-none">
          <div className="flex flex-col items-center gap-1.5" style={{ animation: "scroll-bounce 2.2s ease-in-out infinite" }}>
            <p className="text-[10px] text-[#78716C] uppercase tracking-[0.14em] font-semibold">Scroll to explore</p>
            <ChevronDown size={14} strokeWidth={2} className="text-[rgba(249,115,22,0.55)]" />
          </div>
        </div>
      )}
    </div>
  );
}
