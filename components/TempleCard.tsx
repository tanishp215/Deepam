import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { type Temple } from "@/data/temples";
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
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-[18px] font-bold leading-snug line-clamp-2 text-[#FAFAF9] group-hover:text-[#F97316] transition-colors duration-200">
            {temple.name}
          </h3>
          <p className="text-[14px] text-[#78716C] mt-1">{temple.tradition}</p>
        </div>
        <StateIndicator state={temple.deepamState} size="sm" className="flex-shrink-0 mt-0.5" />
      </div>

      <div className="flex items-center gap-1.5 mb-3">
        <MapPin size={12} strokeWidth={1.75} className="text-[#57534E] flex-shrink-0" />
        <span className="text-[14px] text-[#57534E]">{temple.city}, NC</span>
      </div>

      <p className="text-[15px] text-[#78716C] leading-relaxed line-clamp-2 mb-4">
        {temple.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[rgba(249,115,22,0.08)]">
        <span className="text-[13px] text-[#57534E] group-hover:text-[#A8A29E] transition-colors duration-200">
          {temple.region.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
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
