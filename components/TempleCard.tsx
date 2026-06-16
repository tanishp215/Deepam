import Link from "next/link";
import { type Temple, REGION_LABELS } from "@/data/temples";
import StateIndicator from "./StateIndicator";

interface TempleCardProps {
  temple: Temple;
  index?: number;
  raised?: boolean;  /* kept for backwards compat — unused in new design */
}

/* §5.3 — Ledger entry style: border-y hairlines, no card background, no rounded corners */
export default function TempleCard({ temple, index }: TempleCardProps) {
  const num = index !== undefined ? String(index).padStart(3, "0") : "—";

  return (
    <article
      style={{
        borderTop: "1px solid rgba(28,26,23,0.12)",
        borderBottom: "1px solid rgba(28,26,23,0.12)",
        padding: "28px 0",
        background: "transparent",
      }}
    >
      {/* Entry header: issue number + state indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
            lineHeight: 1,
          }}
        >
          No.{" "}{num}
        </span>
        <StateIndicator state={temple.deepamState} compact />
      </div>

      {/* Temple name */}
      <h3
        style={{
          marginTop: "12px",
          fontFamily: "var(--font-serif)",
          fontSize: "28px",
          lineHeight: 1.1,
          fontWeight: 400,
          color: "var(--ink)",
          letterSpacing: "-0.01em",
        }}
      >
        <Link
          href={`/temples/${temple.id}`}
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
          className="temple-card-name-link"
        >
          {temple.name}
        </Link>
      </h3>

      {/* Tradition · city */}
      <p
        style={{
          marginTop: "8px",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "15px",
          color: "var(--ink-muted)",
          lineHeight: 1.4,
        }}
      >
        {temple.tradition} · {temple.city}, NC
      </p>

      {/* Description */}
      <p
        className="set-body"
        style={{
          marginTop: "16px",
          fontSize: "16px",
          lineHeight: 1.55,
          color: "var(--ink-soft)",
          maxWidth: "60ch",
        }}
      >
        {temple.description}
      </p>

      {/* Footer row: region · read link */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
        }}
      >
        <span>{REGION_LABELS[temple.region]}</span>
        <Link
          href={`/temples/${temple.id}`}
          style={{
            marginLeft: "auto",
            color: "var(--oxblood)",
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.01em",
            textTransform: "none",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--oxblood-deep)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--oxblood)"; }}
        >
          Read the record →
        </Link>
      </div>
    </article>
  );
}
