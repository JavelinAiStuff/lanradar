"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapEvent {
  name: string;
  lat: number;
  lng: number;
  date?: string;
  flag?: string;
  attendance?: string;
  url?: string;
}

export default function EventMap({
  events,
  className = "",
}: {
  events: MapEvent[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [10, 50],
      zoom: 3.5,
    });

    mapRef.current = map;

    map.on("load", () => {
      for (const event of events) {
        const popup = new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(
          `<div style="color:#0a0a0a;font-family:system-ui;padding:2px 4px;">
            <strong>${event.flag || ""} ${event.name}</strong>
            ${event.date ? `<br/><span style="font-size:12px;color:#555;">${event.date}</span>` : ""}
            ${event.attendance ? `<br/><span style="font-size:12px;color:#555;">${event.attendance}</span>` : ""}
          </div>`
        );

        const el = document.createElement("div");
        el.style.width = "14px";
        el.style.height = "14px";
        el.style.borderRadius = "50%";
        el.style.background = "oklch(0.75 0.18 195)";
        el.style.border = "2px solid oklch(0.95 0.02 220)";
        el.style.boxShadow = "0 0 8px oklch(0.75 0.18 195), 0 0 16px oklch(0.5 0.12 195)";
        el.style.cursor = "pointer";

        new maplibregl.Marker({ element: el })
          .setLngLat([event.lng, event.lat])
          .setPopup(popup)
          .addTo(map);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [events]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-64 md:h-96 rounded-xl glow-border ${className}`}
    />
  );
}
