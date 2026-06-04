"use client";

import dynamic from "next/dynamic";
import { type Temple } from "@/data/temples";

const NCMap = dynamic(() => import("@/components/NCMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl bg-[#0D0A07] animate-pulse flex items-center justify-center"
      style={{ height: "var(--map-height, 500px)" }}
    >
      <p className="text-[13px] text-[#57534E] tracking-wide">Loading map</p>
    </div>
  ),
});

interface NCMapClientProps {
  temples: Temple[];
  selectedId?: string;
  height?: string;
}

export default function NCMapClient({ temples, selectedId, height = "500px" }: NCMapClientProps) {
  return <NCMap temples={temples} selectedId={selectedId} height={height} />;
}
