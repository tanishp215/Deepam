"use client";

import dynamic from "next/dynamic";
import { type Temple } from "@/data/temples";

const NCMap = dynamic(() => import("@/components/NCMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-[45px] bg-[#000d10] animate-pulse flex items-center justify-center"
      style={{ height: "var(--map-height, 500px)" }}
    >
      <p className="text-[17px] text-[#8e8e95]">Loading map...</p>
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
