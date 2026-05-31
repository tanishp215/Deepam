import Link from "next/link";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
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
      className={`block p-[22px] group cursor-pointer ${raised ? "card-temple-raised" : "card-temple"}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-[20px] font-bold leading-snug line-clamp-2 text-[#FAFAF9] group-hover:text-[#F97316] transition-colors duration-200">
            {temple.name}
          </h3>
          <p className="text-[17px] text-[#78716C] mt-1">{temple.tradition}</p>
        </div>
        <StateIndicator state={temple.deepamState} size="sm" className="flex-shrink-0 mt-0.5" />
      </div>

      <div className="flex items-center gap-1.5 mb-3">
        <MapPin size={13} weight="fill" className="text-[#78716C] flex-shrink-0" />
        <span className="text-[17px] text-[#78716C]">{temple.city}, NC</span>
      </div>

      <p className="text-[17px] text-[#78716C] leading-relaxed line-clamp-2 mb-5">
        {temple.description}
      </p>

      <div className="flex items-center justify-end pt-4 border-t border-[rgba(249,115,22,0.08)]">
        <span className="text-[17px] font-bold text-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View profile
        </span>
      </div>
    </Link>
  );
}
