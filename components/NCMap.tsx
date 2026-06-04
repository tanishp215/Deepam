"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { type Temple, STATE_COLORS, STATE_LABELS } from "@/data/temples";

const STATE_TEXT: Record<string, string> = {
  sustaining:               "#6EE7B7",
  "lightly-compromising":   "#FCD34D",
  "seriously-compromising": "#FDBA74",
  "stripped-down":          "#FCA5A5",
  "insufficient-evidence":  "#A8A29E",
  "pre-operational":        "#9CA3AF",
};

interface NCMapProps {
  temples: Temple[];
  selectedId?: string;
  onSelect?: (id: string | null) => void;
  height?: string;
}

function buildMarkerHtml(color: string, state: string, isSelected: boolean): string {
  const coreSize = isSelected ? 14 : 11;
  const wrapSize = isSelected ? 36 : 28;
  const pulseSize = wrapSize;
  const isPulsing = state === "sustaining";

  return `
    <div class="deepam-marker-wrap ${isSelected ? "deepam-marker-selected" : ""}" style="width:${wrapSize}px;height:${wrapSize}px;">
      ${isPulsing ? `<span class="deepam-marker-pulse" style="width:${pulseSize}px;height:${pulseSize}px;background:${color};"></span>` : ""}
      <span class="deepam-marker-core" style="width:${coreSize}px;height:${coreSize}px;background:${color};"></span>
    </div>
  `;
}

function buildPopupHtml(temple: Temple): string {
  const color = STATE_COLORS[temple.deepamState];
  const textColor = STATE_TEXT[temple.deepamState] ?? "#A8A29E";
  return `
    <div style="padding:14px 14px 14px;min-width:210px;font-family:system-ui,sans-serif;">
      <div style="display:inline-flex;align-items:center;gap:5px;background:${color}14;border:1px solid ${color}2a;border-radius:4px;padding:3px 8px;margin-bottom:10px;">
        <span style="width:5px;height:5px;border-radius:50%;background:${color};flex-shrink:0;"></span>
        <span style="font-size:11px;font-weight:600;color:${textColor};letter-spacing:0.04em;">${STATE_LABELS[temple.deepamState]}</span>
      </div>
      <div style="font-size:15px;font-weight:700;color:#FAFAF9;margin-bottom:3px;line-height:1.2;letter-spacing:-0.015em;">
        ${temple.name}
      </div>
      <div style="font-size:12px;color:#78716C;margin-bottom:12px;">
        ${temple.city}, NC &middot; ${temple.tradition}
      </div>
      <a href="/temples/${temple.id}" style="
        display:inline-flex;align-items:center;gap:5px;
        background:#F97316;color:#fff;
        font-size:13px;font-weight:600;
        padding:7px 14px;border-radius:6px;
        text-decoration:none;letter-spacing:0.005em;
        box-shadow:inset 0 1px 0 rgba(255,255,255,0.12),0 1px 3px rgba(0,0,0,0.3);
      ">View profile</a>
    </div>
  `;
}

export default function NCMap({ temples, selectedId, onSelect, height = "500px" }: NCMapProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").Marker[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;
    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }

      const map = L.map(mapRef.current, {
        center: [35.5, -79.3],
        zoom: 7,
        zoomControl: false,
        scrollWheelZoom: true,
        attributionControl: true,
        minZoom: 6,
        maxZoom: 16,
      });

      mapInstanceRef.current = map;

      L.control.zoom({ position: "bottomleft" }).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      temples.forEach((temple) => {
        const color  = STATE_COLORS[temple.deepamState];
        const isSelected = temple.id === selectedId;
        const wrapSize = isSelected ? 36 : 28;

        const icon = L.divIcon({
          html: buildMarkerHtml(color, temple.deepamState, isSelected),
          className: "",
          iconSize:   [wrapSize, wrapSize],
          iconAnchor: [wrapSize / 2, wrapSize / 2],
          tooltipAnchor: [0, -(wrapSize / 2) - 2],
          popupAnchor: [0, -(wrapSize / 2) - 4],
        });

        const marker = L.marker(temple.coordinates, { icon }).addTo(map);
        markersRef.current.push(marker);

        // Tooltip on hover
        marker.bindTooltip(temple.shortName, {
          permanent: false,
          direction: "top",
          offset: [0, -2],
          className: "deepam-tooltip",
        });

        // Click behavior
        marker.on("click", () => {
          if (onSelect) {
            onSelect(temple.id);
            map.flyTo(temple.coordinates, Math.max(map.getZoom(), 10), {
              animate: true,
              duration: 0.6,
            });
          } else {
            // Fallback: popup + zoom (non-hero usage)
            marker.bindPopup(buildPopupHtml(temple), {
              closeButton: true,
              className: "deepam-popup",
              maxWidth: 280,
            }).openPopup();
            map.setView(temple.coordinates, Math.max(map.getZoom(), 9), { animate: true });
          }
        });
      });

      if (selectedId) {
        const sel = temples.find((t) => t.id === selectedId);
        if (sel) map.setView(sel.coordinates, 11, { animate: false });
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
  }, [temples, selectedId, onSelect, router]);

  return (
    <div className="relative overflow-hidden" style={{ height, borderRadius: "inherit" }}>
      <div ref={mapRef} className="absolute inset-0" />
    </div>
  );
}
