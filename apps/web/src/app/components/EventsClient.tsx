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
import Countdown from "../../components/Countdown";
import EventMap from "../../components/EventMap";

type View = "grid" | "list" | "map";

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
        <div className="flex bg-panel border border-border/50 rounded-lg overflow-hidden glow-border">
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

        <div className="flex items-center gap-2 ml-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="bg-panel border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground"
          >
            <option value="All">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="bg-panel border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground"
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
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
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
              <h3 className="font-display text-lg font-bold text-primary mb-4 border-b border-border/50 pb-2">
                {month}
              </h3>
              <div className="space-y-3">
                {evts.map((event) => (
                  <a
                    key={event.name}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-panel border border-border/50 hover:border-primary/50 transition-all group glow-border"
                  >
                    <div className="text-2xl">{event.flag}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold group-hover:text-primary transition-colors">
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
        <EventMap
          events={filtered.map((e) => ({
            name: e.name,
            lat: e.lat,
            lng: e.lng,
            date: e.date,
            flag: e.flag,
            attendance: e.attendance,
            url: e.url,
          }))}
        />
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
      className="p-6 rounded-xl bg-panel border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group block glow-border"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
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
      <div className="mt-3 flex items-center justify-between">
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
      {new Date(event.startDate) > new Date() && (
        <Countdown targetDate={event.startDate} compact label="Starts in:" />
      )}
    </a>
  );
}
