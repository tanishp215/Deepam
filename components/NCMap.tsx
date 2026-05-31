"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { type Temple, STATE_COLORS, STATE_LABELS } from "@/data/temples";

interface NCMapProps {
  temples: Temple[];
  selectedId?: string;
  height?: string;
}

export default function NCMap({
  temples,
  selectedId,
  height = "500px",
}: NCMapProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").CircleMarker[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapRef.current) return;

      // Destroy existing map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Create map centered on North Carolina
      const map = L.map(mapRef.current, {
        center: [35.5, -79.3],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // Dark tile layer (CartoDB DarkMatter)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Add temple markers
      temples.forEach((temple) => {
        const color = STATE_COLORS[temple.deepamState];
        const isSelected = temple.id === selectedId;
        const radius = isSelected ? 10 : 7;

        const outerMarker = L.circleMarker(temple.coordinates, {
          radius: radius + 6,
          fillColor: color,
          fillOpacity: 0.15,
          color: color,
          opacity: 0.3,
          weight: 1,
          interactive: false,
        }).addTo(map);

        const marker = L.circleMarker(temple.coordinates, {
          radius,
          fillColor: color,
          fillOpacity: isSelected ? 1 : 0.9,
          color: isSelected ? "#FAFAF9" : color,
          opacity: 1,
          weight: isSelected ? 2 : 1.5,
          className: `temple-marker ${isSelected ? "selected" : ""}`,
        }).addTo(map);

        markersRef.current.push(marker);

        // Popup
        const popupContent = `
          <div style="padding:6px 2px;min-width:210px;font-family:system-ui,sans-serif;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <span style="
                display:inline-block;width:8px;height:8px;
                border-radius:50%;background:${color};
                box-shadow:0 0 8px ${color};flex-shrink:0;
              "></span>
              <span style="font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.06em;">
                ${STATE_LABELS[temple.deepamState]}
              </span>
            </div>
            <h3 style="font-size:17px;font-weight:700;color:#000d10;margin-bottom:4px;line-height:1.2;">
              ${temple.name}
            </h3>
            <p style="font-size:14px;color:#8e8e95;margin-bottom:10px;">
              ${temple.city}, NC &middot; ${temple.tradition}
            </p>
            <a href="/temples/${temple.id}" style="
              display:inline-block;background:#F97316;color:#fff;
              font-size:14px;font-weight:700;padding:8px 18px;
              border-radius:1000px;text-decoration:none;cursor:pointer;
            ">View profile</a>
          </div>
        `;

        marker.bindPopup(popupContent, {
          closeButton: true,
          className: "deepam-popup",
          maxWidth: 260,
        });

        marker.on("click", () => {
          map.setView(temple.coordinates, Math.max(map.getZoom(), 9), {
            animate: true,
          });
        });

        // Hover glow
        marker.on("mouseover", () => {
          marker.setStyle({ fillOpacity: 1, weight: 2 });
          outerMarker.setStyle({ fillOpacity: 0.25, opacity: 0.5 });
        });
        marker.on("mouseout", () => {
          marker.setStyle({
            fillOpacity: isSelected ? 1 : 0.9,
            weight: isSelected ? 2 : 1.5,
          });
          outerMarker.setStyle({ fillOpacity: 0.15, opacity: 0.3 });
        });
      });

      // If a temple is selected, fly to it
      if (selectedId) {
        const selected = temples.find((t) => t.id === selectedId);
        if (selected) {
          map.setView(selected.coordinates, 11, { animate: false });
        }
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, [temples, selectedId]);

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ height }}>
      <div ref={mapRef} className="absolute inset-0" />

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-[#0D0A07]/90 backdrop-blur-sm border border-[rgba(249,115,22,0.15)] rounded-xl p-3 text-xs">
        <p className="text-[#57534E] font-semibold mb-2 font-body uppercase tracking-wider text-[10px]">
          Temple State
        </p>
        {(
          [
            "sustaining",
            "lightly-compromising",
            "seriously-compromising",
            "stripped-down",
            "insufficient-evidence",
          ] as const
        ).map((state) => (
          <div key={state} className="flex items-center gap-2 py-0.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: STATE_COLORS[state],
                boxShadow: `0 0 5px ${STATE_COLORS[state]}`,
              }}
            />
            <span className="text-[#A8A29E] font-body">
              {STATE_LABELS[state]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
