"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Grid3X3,
  List,
  Map,
  Filter,
} from "lucide-react";
import type { LanEvent } from "../data/events";

type View = "grid" | "list" | "map";

// CSS map: approximate positions for European + US locations
function getMapPosition(lat: number, lng: number) {
  // Map bounds: lat 30-65, lng -100 to 30 (covers EU + US)
  const x = ((lng + 100) / 130) * 100;
  const y = ((65 - lat) / 35) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
}

export default function EventsClient({
  events,
  countries,
}: {
  events: LanEvent[];
  countries: string[];
}) {
  const [view, setView] = useState<View>("grid");
  const [countryFilter, setCountryFilter] = useState<string>("All");
  const [sizeFilter, setSizeFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (countryFilter !== "All" && e.country !== countryFilter) return false;
      if (sizeFilter !== "All" && e.size !== sizeFilter) return false;
      return true;
    });
  }, [events, countryFilter, sizeFilter]);

  const grouped = useMemo(() => {
    const sorted = [...filtered].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    const groups: Record<string, LanEvent[]> = {};
    for (const e of sorted) {
      const d = new Date(e.startDate);
      const key = d.toLocaleString("en-US", { month: "long", year: "numeric" });
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    }
    return groups;
  }, [filtered]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {/* View toggles */}
        <div className="flex bg-card border border-border/50 rounded-lg overflow-hidden">
          {([
            ["grid", Grid3X3],
            ["list", List],
            ["map", Map],
          ] as const).map(([v, Icon]) => (
            <button
              key={v}
              onClick={() => setView(v as View)}
              className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
                view === v
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 ml-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="bg-card border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground"
          >
            <option value="All">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="bg-card border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground"
          >
            <option value="All">All Sizes</option>
            <option value="small">Small (&lt;1000)</option>
            <option value="medium">Medium (1000-5000)</option>
            <option value="large">Large (5000+)</option>
          </select>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-6">
        Showing {filtered.length} event{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered
            .sort(
              (a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            )
            .map((event) => (
              <EventCard key={event.name} event={event} />
            ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="space-y-8">
          {Object.entries(grouped).map(([month, evts]) => (
            <div key={month}>
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-border/50 pb-2">
                {month}
              </h3>
              <div className="space-y-3">
                {evts.map((event) => (
                  <a
                    key={event.name}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all group"
                  >
                    <div className="text-2xl">{event.flag}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {event.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date} · {event.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {event.attendance}
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Map View */}
      {view === "map" && (
        <div className="relative w-full aspect-[2/1] bg-card border border-border/50 rounded-xl overflow-hidden">
          {/* CSS-based map background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              background: `
                radial-gradient(circle at 75% 40%, rgba(34,211,238,0.15) 0%, transparent 50%),
                radial-gradient(circle at 60% 50%, rgba(99,102,241,0.1) 0%, transparent 40%),
                linear-gradient(180deg, rgba(34,211,238,0.05) 0%, transparent 100%)
              `,
            }} />
            {/* Grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`h${i}`}
                className="absolute w-full border-t border-primary/10"
                style={{ top: `${(i + 1) * 10}%` }}
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`v${i}`}
                className="absolute h-full border-l border-primary/10"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
          </div>

          {/* Label */}
          <div className="absolute top-4 left-4 text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full">
            Interactive map coming soon — showing approximate locations
          </div>

          {/* Event dots */}
          {filtered.map((event) => {
            const pos = getMapPosition(event.lat, event.lng);
            return (
              <a
                key={event.name}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute group"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`rounded-full bg-primary shadow-lg shadow-primary/50 ${
                    event.size === "large"
                      ? "w-4 h-4"
                      : event.size === "medium"
                      ? "w-3 h-3"
                      : "w-2 h-2"
                  }`}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-background/95 border border-border/50 rounded-lg px-3 py-2 whitespace-nowrap text-xs z-10">
                  <div className="font-semibold">{event.flag} {event.name}</div>
                  <div className="text-muted-foreground">{event.date}</div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EventCard({ event }: { event: LanEvent }) {
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group block"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
          {event.flag} {event.name}
        </h3>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary/70" />
          {event.date}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary/70" />
          {event.location}
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary/70" />
          {event.attendance} expected
        </div>
      </div>
      <div className="mt-3">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            event.size === "large"
              ? "bg-primary/20 text-primary"
              : event.size === "medium"
              ? "bg-accent/20 text-accent"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {event.size}
        </span>
      </div>
    </a>
  );
}
