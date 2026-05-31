"use client";

import dynamic from "next/dynamic";
import { type Temple } from "@/data/temples";

const NCMap = dynamic(() => import("@/components/NCMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl bg-[#1A1410] animate-pulse flex items-center justify-center"
      style={{ height: "var(--map-height, 500px)" }}
    >
      <div className="text-center">
        <div
          className="w-3 h-3 rounded-full mx-auto mb-3 bg-[#F59E0B]"
          style={{ boxShadow: "0 0 12px rgba(245,158,11,0.8)" }}
        />
        <p className="text-xs text-[#57534E] font-body">Loading map...</p>
      </div>
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
