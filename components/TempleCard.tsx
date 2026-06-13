import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { type Temple, REGION_LABELS } from "@/data/temples";
import StateIndicator from "./StateIndicator";

interface TempleCardProps {
  temple: Temple;
  raised?: boolean;
}

export default function TempleCard({ temple, raised = false }: TempleCardProps) {
  return (
    <Link
      href={`/temples/${temple.id}`}
      className={`block p-6 group ${raised ? "card-temple-raised" : "card-temple"}`}
    >
      {/* Header: name + badge */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display text-[17px] font-bold leading-snug line-clamp-2 text-[#FAFAF9] group-hover:text-[#F97316] transition-colors duration-200">
          {temple.name}
        </h3>
        <StateIndicator state={temple.deepamState} size="sm" className="flex-shrink-0 mt-0.5" />
      </div>

      {/* Tradition */}
      <p className="text-[12px] text-[#A8A29E] mb-3">{temple.tradition}</p>

      {/* Location */}
      <div className="flex items-center gap-1.5 mb-3">
        <MapPin size={11} strokeWidth={1.75} className="text-[#57534E] flex-shrink-0" />
        <span className="text-[12px] text-[#57534E]">{temple.city}, NC</span>
      </div>

      {/* Description */}
      <p className="text-[14px] text-[#78716C] leading-relaxed line-clamp-2 mb-4">
        {temple.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[rgba(249,115,22,0.08)]">
        <span className="text-[12px] text-[#57534E] group-hover:text-[#78716C] transition-colors duration-200">
          {REGION_LABELS[temple.region]}
        </span>
        <ArrowRight
          size={13}
          strokeWidth={2}
          className="text-[#57534E] group-hover:text-[#F97316] -translate-x-0.5 group-hover:translate-x-0 transition-all duration-200"
        />
      </div>
    </Link>
  );
}
