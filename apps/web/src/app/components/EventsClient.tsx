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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataCard } from "@/components/thegridcn/data-card";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";

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
        <div className="flex bg-card border border-border rounded-lg overflow-hidden glow-border">
          {([
            ["grid", Grid3X3],
            ["list", List],
            ["map", Map],
          ] as const).map(([v, Icon]) => (
            <button
              key={v}
              onClick={() => setView(v as View)}
              className={`px-4 py-2 flex items-center gap-2 text-sm font-mono uppercase tracking-wider transition-colors ${
                view === v
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground font-mono"
          >
            <option value="All">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground font-mono"
          >
            <option value="All">All Sizes</option>
            <option value="small">Small (&lt;1000)</option>
            <option value="medium">Medium (1000-5000)</option>
            <option value="large">Large (5000+)</option>
          </select>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-6 font-mono uppercase tracking-wider">
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
              <h3 className="font-display text-lg font-bold text-primary mb-4 border-b border-border/50 pb-2 uppercase tracking-wider">
                {month}
              </h3>
              <div className="space-y-3">
                {evts.map((event) => (
                  <a
                    key={event.name}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group glow-border"
                  >
                    <div className="text-2xl">{event.flag}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold group-hover:text-primary transition-colors uppercase tracking-wide">
                        {event.name}
                      </h4>
                      <p className="text-sm text-muted-foreground font-mono">
                        {event.date} · {event.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
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
        <GlowContainer hover={false} intensity="lg" className="p-0 overflow-hidden relative">
          <HUDCornerFrame position="top-left" />
          <HUDCornerFrame position="top-right" />
          <HUDCornerFrame position="bottom-left" />
          <HUDCornerFrame position="bottom-right" />
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
        </GlowContainer>
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
      className="block"
    >
      <DataCard
        title={`${event.flag} ${event.name}`}
        fields={[
          { label: "Date", value: event.date },
          { label: "Location", value: event.location },
          { label: "Attendance", value: `${event.attendance} expected` },
        ]}
        className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
      />
      <div className="mt-2 flex items-center justify-between">
        <Badge
          variant={
            event.size === "large"
              ? "default"
              : event.size === "medium"
              ? "secondary"
              : "outline"
          }
          className="text-[10px] uppercase"
        >
          {event.size}
        </Badge>
      </div>
      {new Date(event.startDate) > new Date() && (
        <Countdown targetDate={event.startDate} compact label="Starts in:" />
      )}
    </a>
  );
}
