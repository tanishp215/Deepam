"use client";

import { useRef, useState, useEffect } from "react";
import { type Temple, type DeepamState } from "@/data/temples";

interface ConstellationProps {
  temples: Temple[];
  onSelect: (temple: Temple) => void;
}

const MARGIN = { top: 64, right: 140, bottom: 56, left: 64 };

const STATE_HEALTH: Record<DeepamState, number> = {
  "sustaining":             0.88,
  "lightly-compromising":   0.62,
  "seriously-compromising": 0.35,
  "stripped-down":          0.12,
  "insufficient-evidence":  0.50,
  "pre-operational":        0.50,
};

const STATE_DOT_COLOR: Record<DeepamState, string> = {
  "sustaining":             "var(--state-sustaining)",
  "lightly-compromising":   "var(--state-tightening)",
  "seriously-compromising": "var(--state-cutting)",
  "stripped-down":          "var(--state-minimum)",
  "insufficient-evidence":  "var(--state-unknown)",
  "pre-operational":        "var(--state-unknown)",
};

const DOT_RADIUS: Record<DeepamState, number> = {
  "sustaining":             9,
  "lightly-compromising":   7,
  "seriously-compromising": 7,
  "stripped-down":          6,
  "insufficient-evidence":  5,
  "pre-operational":        5,
};

const AT_RISK_HALO: Set<DeepamState> = new Set(["seriously-compromising", "stripped-down"]);

const NC_PATH =
  "M 0,20 L 5,18 L 12,22 L 20,20 L 28,16 L 38,18 L 45,14 L 55,16 L 62,12 L 72,14 L 80,10 L 88,12 L 95,8 L 100,10 L 100,22 L 96,28 L 88,30 L 80,32 L 70,34 L 60,32 L 52,36 L 44,34 L 36,38 L 28,36 L 20,32 L 10,30 L 0,28 Z";

function parseYear(temple: Temple): number {
  const y = parseInt(temple.founded ?? "2000", 10);
  return isNaN(y) ? 2000 : y;
}

// Map lat/lng to NC inset (100×50 px)
function ncProject(lat: number, lng: number): { x: number; y: number } {
  const latMin = 33.8, latMax = 36.6;
  const lngMin = -84.3, lngMax = -75.5;
  const x = ((lng - lngMin) / (lngMax - lngMin)) * 100;
  const y = ((latMax - lat) / (latMax - latMin)) * 50;
  return { x, y };
}

export default function Constellation({ temples, onSelect }: ConstellationProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 560 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const update = () => {
      if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect();
        setDims({ w: rect.width || 800, h: rect.height || 560 });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const xMin = 1975, xMax = 2026;

  const xScale = (year: number) =>
    MARGIN.left + ((year - xMin) / (xMax - xMin)) * (dims.w - MARGIN.left - MARGIN.right);

  const yScale = (health: number) =>
    dims.h - MARGIN.bottom - health * (dims.h - MARGIN.top - MARGIN.bottom);

  // Group temples by tradition for lineage threads
  const byTradition: Record<string, Temple[]> = {};
  for (const t of temples) {
    if (!byTradition[t.tradition]) byTradition[t.tradition] = [];
    byTradition[t.tradition].push(t);
  }

  const YEAR_TICKS = [1976, 1985, 1995, 2005, 2015, 2024];

  const hoveredTemple = hoveredId ? temples.find((t) => t.id === hoveredId) ?? null : null;
  const hoveredDotRadius = hoveredTemple ? DOT_RADIUS[hoveredTemple.deepamState] : 5;

  return (
    <figure
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(520px, 64vh, 720px)",
        margin: 0,
        padding: 0,
      }}
    >
      <figcaption className="sr-only">
        Constellation chart: {temples.length} Hindu temples in North Carolina,
        plotted by founding year and operational health. Temples sharing a tradition
        are connected by dotted lines.
      </figcaption>

      <div
        ref={wrapRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "var(--paper-warm)",
          overflow: "hidden",
        }}
      >
        <svg width="100%" height="100%" aria-hidden="true">

          {/* ── 1. Lineage threads ── */}
          {Object.values(byTradition)
            .filter((group) => group.length >= 2)
            .map((group) => {
              const sorted = [...group].sort((a, b) => parseYear(a) - parseYear(b));
              const d = sorted
                .map(
                  (t, i) =>
                    `${i === 0 ? "M" : "L"}${xScale(parseYear(t))},${yScale(STATE_HEALTH[t.deepamState])}`
                )
                .join(" ");
              return (
                <path
                  key={`thread-${sorted[0].tradition}`}
                  d={d}
                  stroke="var(--brass)"
                  strokeOpacity={0.22}
                  strokeWidth={0.75}
                  strokeDasharray="2 4"
                  fill="none"
                />
              );
            })}

          {/* ── 4. X-axis ── */}
          <line
            x1={MARGIN.left}
            y1={dims.h - MARGIN.bottom}
            x2={dims.w - MARGIN.right}
            y2={dims.h - MARGIN.bottom}
            stroke="var(--brass)"
            strokeOpacity={0.3}
            strokeWidth={0.5}
          />
          {YEAR_TICKS.map((year) => (
            <g key={`tick-${year}`}>
              <line
                x1={xScale(year)}
                y1={dims.h - MARGIN.bottom}
                x2={xScale(year)}
                y2={dims.h - MARGIN.bottom + 4}
                stroke="var(--brass)"
                strokeWidth={0.5}
                strokeOpacity={0.4}
              />
              <text
                x={xScale(year)}
                y={dims.h - MARGIN.bottom + 16}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={9}
                fill="var(--ink-faint)"
              >
                {year}
              </text>
            </g>
          ))}

          {/* ── 5. Y-axis label ── */}
          <text
            x={-(dims.h / 2)}
            y={20}
            transform="rotate(-90)"
            textAnchor="middle"
            fontFamily="var(--font-serif)"
            fontStyle="italic"
            fontSize={9}
            fill="var(--ink-faint)"
            letterSpacing={1.5}
          >
            AT RISK ── DIMMING ── STEADY ── SUSTAINING
          </text>

          {/* ── 2. Temple dots ── */}
          {temples.map((temple) => {
            const year = parseYear(temple);
            const health = STATE_HEALTH[temple.deepamState];
            const cx = xScale(year);
            const cy = yScale(health);
            const r = DOT_RADIUS[temple.deepamState];
            const color = STATE_DOT_COLOR[temple.deepamState];
            const isHovered = hoveredId === temple.id;

            return (
              <g
                key={temple.id}
                transform={`translate(${cx}, ${cy})`}
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(temple)}
                onMouseEnter={() => {
                  setHoveredId(temple.id);
                  setHoverPos({ x: cx, y: cy });
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  setHoverPos(null);
                }}
              >
                {/* Inner g handles hover scale around the dot center */}
                <g transform={isHovered ? "scale(1.3)" : "scale(1)"}>
                  {AT_RISK_HALO.has(temple.deepamState) && (
                    <circle
                      r={r + 6}
                      fill="none"
                      stroke={color}
                      strokeWidth={0.75}
                      strokeOpacity={0.4}
                    />
                  )}
                  <circle r={r} fill={color} stroke="none" />
                </g>
              </g>
            );
          })}

          {/* ── 6. NC inset ── */}
          <g transform={`translate(${dims.w - MARGIN.right + 16}, ${dims.h - MARGIN.bottom - 80})`}>
            <path
              d={NC_PATH}
              stroke="var(--brass)"
              strokeWidth={0.5}
              strokeOpacity={0.5}
              fill="none"
            />
            {temples.map((temple) => {
              const [lat, lng] = temple.coordinates;
              const { x, y } = ncProject(lat, lng);
              const isHovered = hoveredId === temple.id;
              return (
                <circle
                  key={`nc-${temple.id}`}
                  cx={x}
                  cy={y}
                  r={isHovered ? 4 : 2}
                  fill={isHovered ? "var(--oxblood)" : "var(--brass)"}
                  fillOpacity={isHovered ? 1 : 0.5}
                />
              );
            })}
            <text
              y={58}
              fontFamily="var(--font-sans)"
              fontSize={8}
              fill="var(--ink-faint)"
              letterSpacing={0.8}
              style={{ textTransform: "uppercase" }}
            >
              Hover a lamp to locate
            </text>
          </g>

          {/* ── 3. Hover annotation (always on top) ── */}
          {hoveredId && hoverPos && hoveredTemple && (() => {
            const x = hoverPos.x;
            const y = hoverPos.y;
            const lx = x + 24;
            const ly = y - 16;
            const boxWidth = Math.min(hoveredTemple.name.length * 7.5 + 16, 200);
            return (
              <g>
                <line
                  x1={x}
                  y1={y - hoveredDotRadius}
                  x2={lx}
                  y2={ly}
                  stroke="var(--brass)"
                  strokeWidth={0.75}
                  strokeOpacity={0.7}
                />
                <rect
                  x={lx}
                  y={ly - 26}
                  width={boxWidth}
                  height={38}
                  fill="var(--paper)"
                  fillOpacity={0.95}
                  stroke="var(--brass)"
                  strokeWidth={0.5}
                  strokeOpacity={0.5}
                  rx={2}
                />
                <text
                  x={lx + 8}
                  y={ly - 12}
                  fontFamily="var(--font-serif)"
                  fontStyle="italic"
                  fontSize={12}
                  fill="var(--ink)"
                >
                  {hoveredTemple.name}
                </text>
                <text
                  x={lx + 8}
                  y={ly + 2}
                  fontFamily="var(--font-sans)"
                  fontSize={9}
                  fill="var(--ink-muted)"
                  letterSpacing={0.8}
                  style={{ textTransform: "uppercase" }}
                >
                  {hoveredTemple.city}
                </text>
              </g>
            );
          })()}

        </svg>
      </div>
    </figure>
  );
}
