"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { type Temple } from "@/data/temples";

const NCMap = dynamic(() => import("@/components/NCMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "clamp(400px, 58vh, 640px)",
        background: "var(--paper-warm)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "12px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
        }}
      >
        Loading map…
      </p>
    </div>
  ),
});

export default function HeroMap({ temples }: { temples: Temple[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div style={{ width: "100%", height: "clamp(400px, 58vh, 640px)" }}>
      <NCMap
        temples={temples}
        selectedId={selectedId ?? undefined}
        onSelect={setSelectedId}
        height="100%"
      />
    </div>
  );
}
