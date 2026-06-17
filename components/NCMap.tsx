"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
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

const BASEMAPS = {
  editorial: {
    label: "Editorial",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
  },
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri",
    subdomains: undefined,
  },
  terrain: {
    label: "Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors, SRTM | OpenTopoMap (CC-BY-SA)",
    subdomains: "abc",
  },
} as const;

type BasemapKey = keyof typeof BASEMAPS;

interface NCMapProps {
  temples: Temple[];
  selectedId?: string;
  hoveredId?: string;
  onSelect?: (id: string | null) => void;
  onHover?: (id: string | null) => void;
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
    <div style="padding:14px;min-width:210px;font-family:system-ui,sans-serif;background:rgba(14,22,38,0.95);">
      <div style="display:inline-flex;align-items:center;gap:5px;background:${color}14;border:1px solid ${color}2a;border-radius:4px;padding:3px 8px;margin-bottom:10px;">
        <span style="width:5px;height:5px;border-radius:50%;background:${color};flex-shrink:0;"></span>
        <span style="font-size:11px;font-weight:600;color:${textColor};letter-spacing:0.04em;">${STATE_LABELS[temple.deepamState]}</span>
      </div>
      <div style="font-size:15px;font-weight:700;color:#E8E2D0;margin-bottom:3px;line-height:1.2;letter-spacing:-0.015em;">
        ${temple.name}
      </div>
      <div style="font-size:12px;color:#8C8772;margin-bottom:12px;">
        ${temple.city}, NC &middot; ${temple.tradition}
      </div>
      <a href="/temples/${temple.id}" style="
        display:inline-flex;align-items:center;gap:5px;
        background:#8C2F2A;color:#E8E2D0;
        font-size:13px;font-weight:600;
        padding:7px 14px;border-radius:2px;
        text-decoration:none;letter-spacing:0.005em;
      ">View profile</a>
    </div>
  `;
}

export default function NCMap({ temples, selectedId, hoveredId, onSelect, onHover, height = "500px" }: NCMapProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markerMapRef = useRef<Map<string, import("leaflet").Marker>>(new Map());
  const activeTileLayerRef = useRef<import("leaflet").TileLayer | null>(null);

  const [activeBasemap, setActiveBasemap] = useState<BasemapKey>("editorial");

  // Effect 1: Initialize map and markers (no tile layer)
  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;
    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerMapRef.current.clear();
        activeTileLayerRef.current = null;
      }

      const ncBounds = L.latLngBounds(
        [33.5, -84.5],
        [36.8, -74.5]
      );

      const map = L.map(mapRef.current, {
        center: [35.5, -79.3],
        zoom: 7,
        zoomControl: false,
        scrollWheelZoom: true,
        attributionControl: true,
        minZoom: 6,
        maxZoom: 16,
        maxBounds: ncBounds,
        maxBoundsViscosity: 1.0,
      });

      mapInstanceRef.current = map;

      // Add markers
      temples.forEach((temple) => {
        const color = STATE_COLORS[temple.deepamState];
        const isSelected = temple.id === selectedId;
        const wrapSize = isSelected ? 36 : 28;

        const icon = L.divIcon({
          html: buildMarkerHtml(color, temple.deepamState, isSelected),
          className: "",
          iconSize: [wrapSize, wrapSize],
          iconAnchor: [wrapSize / 2, wrapSize / 2],
          tooltipAnchor: [0, -(wrapSize / 2) - 2],
          popupAnchor: [0, -(wrapSize / 2) - 4],
        });

        const marker = L.marker(temple.coordinates, { icon }).addTo(map);
        markerMapRef.current.set(temple.id, marker);

        // Tooltip on hover
        marker.bindTooltip(temple.shortName, {
          permanent: false,
          direction: "top",
          offset: [0, -2],
          className: "deepam-tooltip",
        });

        // Hover events
        marker.on("mouseover", () => onHover?.(temple.id));
        marker.on("mouseout", () => onHover?.(null));

        // Click behavior
        marker.on("click", () => {
          if (onSelect) {
            onSelect(temple.id);
            map.flyTo(temple.coordinates, Math.max(map.getZoom(), 10), {
              animate: true,
              duration: 0.6,
            });
          } else {
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
      markerMapRef.current.clear();
      activeTileLayerRef.current = null;
    };
  }, [temples, selectedId, onSelect, onHover, router]);

  // Effect 2: Switch tile layer when activeBasemap changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    import("leaflet").then((L) => {
      if (activeTileLayerRef.current) {
        map.removeLayer(activeTileLayerRef.current);
      }
      const bm = BASEMAPS[activeBasemap];
      const layer = L.tileLayer(bm.url, {
        attribution: bm.attribution,
        subdomains: bm.subdomains ?? "",
        maxZoom: 19,
      });
      layer.addTo(map);
      activeTileLayerRef.current = layer;
    });
  }, [activeBasemap]);

  // Effect 3: Hover halo on markers
  useEffect(() => {
    markerMapRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      if (!el) return;
      const wrap = el.querySelector(".deepam-marker-wrap") as HTMLElement | null;
      if (!wrap) return;
      if (id === hoveredId) {
        wrap.style.boxShadow = "0 0 0 3px rgba(201,184,122,0.4)";
        wrap.style.borderRadius = "50%";
      } else {
        wrap.style.boxShadow = "";
      }
    });
  }, [hoveredId]);

  return (
    <div className="relative overflow-hidden" style={{ height, borderRadius: "inherit" }}>
      <div ref={mapRef} className="absolute inset-0" />

      {/* Basemap toggle */}
      <div style={{
        position: "absolute",
        bottom: "50px",
        left: "10px",
        zIndex: 1000,
        display: "flex",
        gap: "3px",
        background: "rgba(14,22,38,0.85)",
        border: "1px solid rgba(201,184,122,0.2)",
        borderRadius: "3px",
        padding: "3px",
        backdropFilter: "blur(6px)",
      }}>
        {(["editorial", "satellite", "terrain"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setActiveBasemap(key)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              padding: "4px 8px",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              background: activeBasemap === key ? "rgba(201,184,122,0.2)" : "transparent",
              color: activeBasemap === key ? "#C9B87A" : "#8C8772",
              transition: "all 0.15s",
            }}
          >
            {BASEMAPS[key].label}
          </button>
        ))}
      </div>

      {/* Custom zoom buttons */}
      <div style={{
        position: "absolute",
        bottom: "14px",
        left: "10px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}>
        {(["+", "−"] as const).map((sym, i) => (
          <button
            key={sym}
            onClick={() => {
              const map = mapInstanceRef.current;
              if (!map) return;
              if (i === 0) map.zoomIn(); else map.zoomOut();
            }}
            style={{
              width: "32px",
              height: "32px",
              background: "rgba(14,22,38,0.85)",
              border: "1px solid rgba(201,184,122,0.2)",
              borderRadius: "2px",
              color: "#C9B87A",
              fontSize: "18px",
              lineHeight: 1,
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {sym}
          </button>
        ))}
      </div>
    </div>
  );
}
