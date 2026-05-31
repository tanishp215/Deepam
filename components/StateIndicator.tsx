import { type DeepamState, STATE_LABELS, STATE_COLORS } from "@/data/temples";
import { cn } from "@/lib/utils";

interface StateIndicatorProps {
  state: DeepamState;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const STATE_BG: Record<DeepamState, string> = {
  sustaining: "rgba(245,158,11,0.12)",
  "lightly-compromising": "rgba(249,115,22,0.12)",
  "seriously-compromising": "rgba(239,68,68,0.12)",
  "stripped-down": "rgba(127,29,29,0.2)",
  "insufficient-evidence": "rgba(87,83,78,0.15)",
  "pre-operational": "rgba(55,65,81,0.15)",
};

const STATE_TEXT: Record<DeepamState, string> = {
  sustaining: "#FCD34D",
  "lightly-compromising": "#FB923C",
  "seriously-compromising": "#EF4444",
  "stripped-down": "#F87171",
  "insufficient-evidence": "#A8A29E",
  "pre-operational": "#9CA3AF",
};

export default function StateIndicator({
  state,
  size = "md",
  showLabel = true,
  className,
}: StateIndicatorProps) {
  const color = STATE_COLORS[state];
  const textColor = STATE_TEXT[state];
  const bg = STATE_BG[state];
  const label = STATE_LABELS[state];

  const dotSize = size === "sm" ? 6 : size === "lg" ? 12 : 8;
  const glowSize = dotSize * 2.5;

  return (
    <div
      className={cn("state-badge", className)}
      style={{ background: bg, color: textColor }}
    >
      {/* Lamp dot */}
      <span
        className="relative flex-shrink-0"
        style={{ width: dotSize, height: dotSize }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 ${glowSize}px ${color}`,
          }}
        />
        {(state === "sustaining" || state === "lightly-compromising") && (
          <span
            className="absolute inset-0 rounded-full animate-pulse-slow"
            style={{ background: color, opacity: 0.5 }}
          />
        )}
      </span>
      {showLabel && <span>{label}</span>}
    </div>
  );
}

/* Standalone dot for map legends and compact views */
export function StateDot({
  state,
  size = 10,
}: {
  state: DeepamState;
  size?: number;
}) {
  const color = STATE_COLORS[state];
  return (
    <span
      className="relative inline-flex flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 ${size * 1.5}px ${color}60`,
        }}
      />
      {(state === "sustaining") && (
        <span
          className="absolute inset-0 rounded-full animate-pulse-slow opacity-50"
          style={{ background: color }}
        />
      )}
    </span>
  );
}
