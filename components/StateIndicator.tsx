import { type DeepamState, STATE_LABELS, STATE_COLORS } from "@/data/temples";
import { cn } from "@/lib/utils";

interface StateIndicatorProps {
  state: DeepamState;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const STATE_BG: Record<DeepamState, string> = {
  "sustaining":             "rgba(16,185,129,0.08)",
  "lightly-compromising":   "rgba(245,158,11,0.1)",
  "seriously-compromising": "rgba(249,115,22,0.1)",
  "stripped-down":          "rgba(239,68,68,0.1)",
  "insufficient-evidence":  "rgba(120,113,108,0.08)",
  "pre-operational":        "rgba(55,65,81,0.08)",
};

const STATE_BORDER: Record<DeepamState, string> = {
  "sustaining":             "rgba(16,185,129,0.22)",
  "lightly-compromising":   "rgba(245,158,11,0.22)",
  "seriously-compromising": "rgba(249,115,22,0.22)",
  "stripped-down":          "rgba(239,68,68,0.25)",
  "insufficient-evidence":  "rgba(120,113,108,0.18)",
  "pre-operational":        "rgba(55,65,81,0.18)",
};

const STATE_TEXT: Record<DeepamState, string> = {
  "sustaining":             "#6EE7B7",
  "lightly-compromising":   "#FCD34D",
  "seriously-compromising": "#FDBA74",
  "stripped-down":          "#FCA5A5",
  "insufficient-evidence":  "#A8A29E",
  "pre-operational":        "#9CA3AF",
};

export default function StateIndicator({
  state,
  size = "md",
  showLabel = true,
  className,
}: StateIndicatorProps) {
  const color      = STATE_COLORS[state];
  const textColor  = STATE_TEXT[state];
  const bg         = STATE_BG[state];
  const border     = STATE_BORDER[state];
  const label      = STATE_LABELS[state];
  const dotSize    = size === "sm" ? 5 : size === "lg" ? 10 : 7;

  return (
    <div
      className={cn("state-badge", className)}
      style={{ background: bg, color: textColor, border: `1px solid ${border}` }}
    >
      <span className="relative flex-shrink-0" style={{ width: dotSize, height: dotSize }}>
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: color }}
        />
        {state === "sustaining" && (
          <span
            className="absolute inset-0 rounded-full animate-pulse-slow opacity-40"
            style={{ background: color }}
          />
        )}
      </span>
      {showLabel && (
        <span style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.4 }}>{label}</span>
      )}
    </div>
  );
}

export function StateDot({ state, size = 10 }: { state: DeepamState; size?: number }) {
  const color = STATE_COLORS[state];
  return (
    <span className="relative inline-flex flex-shrink-0" style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: color }}
      />
      {state === "sustaining" && (
        <span
          className="absolute inset-0 rounded-full animate-pulse-slow opacity-40"
          style={{ background: color }}
        />
      )}
    </span>
  );
}
