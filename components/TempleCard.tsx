import Link from "next/link";
import { MapPin, Phone, Globe } from "@phosphor-icons/react/dist/ssr";
import { type Temple } from "@/data/temples";
import StateIndicator from "./StateIndicator";

interface TempleCardProps {
  temple: Temple;
}

export default function TempleCard({ temple }: TempleCardProps) {
  return (
    <Link
      href={`/temples/${temple.id}`}
      className="card-temple block p-5 group cursor-pointer"
    >
      {/* Top row: name + state */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-[#FAFAF9] leading-snug group-hover:text-[#FCD34D] transition-colors duration-200 line-clamp-2">
            {temple.name}
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5 font-body">
            {temple.tradition}
          </p>
        </div>
        <StateIndicator
          state={temple.deepamState}
          size="sm"
          className="flex-shrink-0 mt-0.5"
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-[#A8A29E] mb-3">
        <MapPin size={12} weight="fill" className="text-[#57534E] flex-shrink-0" />
        <span>
          {temple.city}, NC
        </span>
      </div>

      {/* Description excerpt */}
      <p className="text-sm text-[#78716C] leading-relaxed line-clamp-2 mb-4">
        {temple.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.04)]">
        <div className="flex items-center gap-3">
          {temple.phone && (
            <span className="flex items-center gap-1 text-xs text-[#57534E]">
              <Phone size={11} weight="fill" />
              {temple.phone}
            </span>
          )}
          {temple.website && (
            <span className="flex items-center gap-1 text-xs text-[#57534E]">
              <Globe size={11} weight="fill" />
              {temple.website.replace(/^https?:\/\//, "").split("/")[0]}
            </span>
          )}
        </div>
        <span className="text-xs font-medium text-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View profile
        </span>
      </div>
    </Link>
  );
}
