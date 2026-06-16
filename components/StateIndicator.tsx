import { type DeepamState } from "@/data/temples";
import { cn } from "@/lib/utils";

/* §5.4 — Typographic state marker system
   Escalating-triangle notation instead of colored chips.
   Reads as a measurement / structural notation, not a UI label. */

const STATE_COLOR: Record<DeepamState, string> = {
  "sustaining":             "var(--state-sustaining)",
  "lightly-compromising":   "var(--state-tightening)",
  "seriously-compromising": "var(--state-cutting)",
  "stripped-down":          "var(--state-minimum)",
  "insufficient-evidence":  "var(--state-unknown)",
  "pre-operational":        "var(--state-unknown)",
};

const STATE_LABEL: Record<DeepamState, string> = {
  "sustaining":             "Sustaining",
  "lightly-compromising":   "Quietly Tightening",
  "seriously-compromising": "Visibly Cutting Back",
  "stripped-down":          "Operating at Minimum",
  "insufficient-evidence":  "Insufficient Evidence",
  "pre-operational":        "In Development",
};

function StateGlyph({ state }: { state: DeepamState }) {
  const color = STATE_COLOR[state];

  if (state === "sustaining") {
    return (
      <span
        aria-hidden="true"
        style={{ color, fontSize: "9px", lineHeight: 1, letterSpacing: 0 }}
      >
        ●
      </span>
    );
  }

  if (state === "lightly-compromising") {
    return (
      <span aria-hidden="true" style={{ color, fontSize: "9px", lineHeight: 1 }}>
        ▲
      </span>
    );
  }

  if (state === "seriously-compromising") {
    return (
      <span aria-hidden="true" style={{ color, fontSize: "9px", lineHeight: 1, letterSpacing: "1px" }}>
        ▲▲
      </span>
    );
  }

  if (state === "stripped-down") {
    return (
      <span aria-hidden="true" style={{ color, fontSize: "9px", lineHeight: 1, letterSpacing: "1px" }}>
        ▲▲▲
      </span>
    );
  }

  /* insufficient-evidence + pre-operational — dashed outline circle */
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        border: `1.5px dashed ${color}`,
        flexShrink: 0,
      }}
    />
  );
}

interface StateIndicatorProps {
  state: DeepamState;
  compact?: boolean;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StateIndicator({
  state,
  compact = false,
  showLabel = true,
  className,
}: StateIndicatorProps) {
  const label = STATE_LABEL[state];
  const color = STATE_COLOR[state];
  const showText = !compact && showLabel;

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "11px",
        fontWeight: 500,
        fontVariant: "small-caps",
        letterSpacing: "0.08em",
        color: color,
        lineHeight: 1.3,
      }}
    >
      <StateGlyph state={state} />
      {showText && <span>{label}</span>}
      {!showText && <span className="sr-only">{label}</span>}
    </span>
  );
}

/* StateDot kept for backwards compat with any remaining usage */
export function StateDot({ state, size = 10 }: { state: DeepamState; size?: number }) {
  return <StateGlyph state={state} />;
}
