"use client";

import { useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import TempleSheet from "@/components/TempleSheet";
import StateIndicator from "@/components/StateIndicator";
import {
  temples as allTemples,
  getActiveTemples,
  type Temple,
  type DeepamState,
  type Region,
  STATE_LABELS,
  REGION_LABELS,
} from "@/data/temples";

const NCMap = dynamic(() => import("@/components/NCMap"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
        Loading map…
      </p>
    </div>
  ),
});

const STATE_ORDER: Record<DeepamState, number> = {
  "stripped-down": 0,
  "seriously-compromising": 1,
  "lightly-compromising": 2,
  "sustaining": 3,
  "insufficient-evidence": 4,
  "pre-operational": 5,
};

const STATE_DOT_COLOR: Record<DeepamState, string> = {
  "sustaining":             "var(--state-sustaining)",
  "lightly-compromising":   "var(--state-tightening)",
  "seriously-compromising": "var(--state-cutting)",
  "stripped-down":          "var(--state-minimum)",
  "insufficient-evidence":  "var(--state-unknown)",
  "pre-operational":        "var(--state-unknown)",
};

const STATE_CHIPS: Array<{ value: DeepamState | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "sustaining", label: "Sustaining" },
  { value: "lightly-compromising", label: "Tightening" },
  { value: "seriously-compromising", label: "Cutting Back" },
  { value: "stripped-down", label: "At Minimum" },
  { value: "insufficient-evidence", label: "Unknown" },
];

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<DeepamState | "all">("all");
  const [sortBy, setSortBy] = useState<"name" | "state" | "region" | "year">("state");
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const activeTemples = getActiveTemples();

  const filtered = useMemo(() => {
    let list = activeTemples.filter((t) => {
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

    list = [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "state") return STATE_ORDER[a.deepamState] - STATE_ORDER[b.deepamState];
      if (sortBy === "region") return a.region.localeCompare(b.region);
      if (sortBy === "year") {
        const ay = parseInt(a.founded ?? "9999", 10);
        const by = parseInt(b.founded ?? "9999", 10);
        return ay - by;
      }
      return 0;
    });

    return list;
  }, [activeTemples, search, stateFilter, sortBy]);

  const hasFilters = search.trim() !== "" || stateFilter !== "all";

  return (
    <>
      <style>{`.map-search::placeholder { color: var(--ink-faint); font-style: italic; }`}</style>
      <Navigation />

      {/* Full-height two-column layout below nav */}
      <div style={{
        display: "flex",
        height: "calc(100vh - 68px)",
        marginTop: "68px",
        overflow: "hidden",
      }}>
        {/* SIDEBAR — 360px fixed */}
        <aside style={{
          width: "360px",
          flexShrink: 0,
          background: "var(--paper-warm)",
          borderRight: "1px solid rgba(201,184,122,0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
          {/* 1. Header strip */}
          <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid rgba(201,184,122,0.15)", flexShrink: 0 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, fontVariant: "small-caps", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brass)", marginBottom: "8px" }}>
              No. 27 · The Map
            </p>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "20px", fontWeight: 400, color: "var(--ink)", lineHeight: 1.2, marginBottom: "8px" }}>
              Twenty-six lamps in North Carolina.
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {filtered.length} temples · Last updated Jun 17, 2026
            </p>
          </div>

          {/* 2. Search field */}
          <div style={{ padding: "16px 24px 0", flexShrink: 0 }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a name, a city, a tradition…"
              className="map-search"
              style={{
                width: "100%",
                background: "var(--paper-deep)",
                border: "1px solid rgba(201,184,122,0.25)",
                borderRadius: "2px",
                padding: "9px 12px",
                fontFamily: "var(--font-serif)",
                fontStyle: search ? "normal" : "italic",
                fontSize: "14px",
                color: "var(--ink)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* 3. State filter chips */}
          <div style={{ padding: "14px 24px 0", flexShrink: 0, display: "flex", flexWrap: "wrap", gap: "4px 0" }}>
            {STATE_CHIPS.map(({ value, label }) => {
              const count = value === "all"
                ? activeTemples.length
                : activeTemples.filter((t) => t.deepamState === value).length;
              const isActive = stateFilter === value;
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
                    color: isActive ? "var(--ink)" : "var(--ink-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 0 2px",
                    marginRight: "12px",
                    textDecoration: isActive ? "underline" : "none",
                    textDecorationColor: "var(--oxblood)",
                    textUnderlineOffset: "4px",
                    textDecorationThickness: "1px",
                  }}
                >
                  {label}{" "}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* 4. Sort selector */}
          <div style={{ padding: "12px 24px 0", flexShrink: 0, display: "flex", gap: "12px", alignItems: "baseline", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontVariant: "small-caps", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)" }}>Sort ·</span>
            {(["name", "state", "region", "year"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontVariant: "small-caps",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: sortBy === opt ? "var(--ink)" : "var(--ink-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: sortBy === opt ? "underline" : "none",
                  textDecorationColor: "var(--brass)",
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "1px",
                }}
              >
                {opt === "year" ? "Year founded" : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          {/* 5. Temple list */}
          <div
            ref={listRef}
            style={{ flex: 1, overflowY: "auto", marginTop: "12px" }}
          >
            {filtered.map((temple) => (
              <div
                key={temple.id}
                data-temple-id={temple.id}
                onClick={() => setSelectedTemple(temple)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 24px",
                  borderBottom: "0.5px solid rgba(232,226,208,0.08)",
                  cursor: "pointer",
                  background: selectedTemple?.id === temple.id ? "var(--paper-deep)" : hoveredId === temple.id ? "rgba(27,42,71,0.6)" : "transparent",
                  borderLeft: selectedTemple?.id === temple.id ? "2px solid var(--oxblood)" : "2px solid transparent",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={() => setHoveredId(temple.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* State dot */}
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATE_DOT_COLOR[temple.deepamState], flexShrink: 0 }} />

                {/* Name + city */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "15px", color: "var(--ink)", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {temple.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
                    {temple.city} · NC
                  </p>
                </div>

                {/* Chevron / active indicator */}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: selectedTemple?.id === temple.id ? "var(--oxblood)" : "var(--ink-faint)", flexShrink: 0 }}>
                  {selectedTemple?.id === temple.id ? "●" : "›"}
                </span>
              </div>
            ))}
          </div>

          {/* 6. Bottom strip */}
          <div style={{
            padding: "12px 24px",
            borderTop: "1px solid rgba(201,184,122,0.12)",
            background: "var(--paper-warm)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {filtered.length} of {activeTemples.length} shown
            </p>
            {hasFilters && (
              <button onClick={() => { setSearch(""); setStateFilter("all"); }} style={{
                fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "13px", color: "var(--oxblood)", background: "none", border: "none", cursor: "pointer", padding: 0
              }}>
                Reset filters
              </button>
            )}
          </div>
        </aside>

        {/* MAP — fills remaining space */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <NCMap
            temples={filtered}
            selectedId={selectedTemple?.id ?? undefined}
            onSelect={(id) => {
              if (!id) { setSelectedTemple(null); return; }
              const t = allTemples.find((x) => x.id === id);
              if (t) setSelectedTemple(t);
            }}
            height="100%"
          />
        </div>
      </div>

      <TempleSheet temple={selectedTemple} onClose={() => setSelectedTemple(null)} />
    </>
  );
}
