"use client";

import Link from "next/link";
import { type Temple } from "@/data/temples";
import StateIndicator from "@/components/StateIndicator";
import { REGION_LABELS } from "@/data/temples";

interface TempleSheetProps {
  temple: Temple | null;
  onClose: () => void;
}

export default function TempleSheet({ temple, onClose }: TempleSheetProps) {
  return (
    <aside
      aria-label="Temple detail"
      style={{
        position: "fixed",
        right: 0,
        top: "68px",
        bottom: 0,
        width: "340px",
        zIndex: 1200,
        overflowY: "auto",
        background: "var(--paper-warm)",
        borderLeft: "1px solid rgba(201,184,122,0.2)",
        boxShadow: "-4px 0 24px rgba(14,22,38,0.5)",
        transform: temple ? "translateX(0)" : "translateX(100%)",
        transition: "transform 280ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close temple record"
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
          lineHeight: 1,
          color: "var(--ink-muted)",
          padding: "4px",
        }}
      >
        ×
      </button>

      {temple && (
        <>
          {/* Header */}
          <div style={{ padding: "24px 24px 0" }}>
            <StateIndicator state={temple.deepamState} compact={false} />

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "24px",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
                marginTop: "10px",
              }}
            >
              {temple.name}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "14px",
                color: "var(--ink-muted)",
                marginTop: "6px",
              }}
            >
              {temple.tradition} &middot; {temple.city}
            </p>
          </div>

          {/* Brass rule */}
          <div
            style={{
              height: "1px",
              background: "var(--rule-brass)",
              margin: "20px 0",
            }}
          />

          {/* State note */}
          <div style={{ padding: "0 24px" }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "15px",
                color: "var(--ink-soft)",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {temple.stateNote}
            </p>
          </div>

          {/* Mini-ledger */}
          <div style={{ padding: "16px 24px 0" }}>
            <dl>
              {(
                [
                  { label: "REGION",    value: REGION_LABELS[temple.region] },
                  { label: "TRADITION", value: temple.tradition },
                  {
                    label: "EVENTS",
                    value:
                      temple.events.length > 0
                        ? `${temple.events.length} on record`
                        : "None recorded",
                  },
                ] as { label: string; value: string }[]
              ).map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    marginBottom: "12px",
                  }}
                >
                  <dt
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      fontVariant: "small-caps",
                      letterSpacing: "0.1em",
                      color: "var(--ink-faint)",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--ink)",
                    }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Brass rule */}
          <div
            style={{
              height: "1px",
              background: "var(--rule-brass)",
              margin: "20px 0",
            }}
          />

          {/* CTA */}
          <div style={{ padding: "0 24px 24px" }}>
            <Link
              href={`/temples/${temple.id}`}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                fontVariant: "small-caps",
                letterSpacing: "0.06em",
                color: "var(--oxblood)",
                textDecoration: "none",
                display: "block",
              }}
            >
              Read the full record &rarr;
            </Link>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--ink-faint)",
                marginTop: "6px",
              }}
            >
              Full history &middot; data sources &middot; pledge
            </p>
          </div>
        </>
      )}
    </aside>
  );
}
