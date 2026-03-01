"use client";

import { useState } from "react";
import { Star, Trophy } from "lucide-react";
import NavBar from "../components/NavBar";
import { lanParties, type LanPartyEntry } from "../data/database";

const comparableEvents = lanParties.slice(0, 8);

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );
}

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="text-xs text-muted-foreground w-6 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

function getBadges(events: LanPartyEntry[]): Record<string, string[]> {
  if (events.length < 2) return {};
  const badges: Record<string, string[]> = {};
  events.forEach((e) => { badges[e.slug] = []; });

  const byRating = [...events].sort((a, b) => {
    const ra = Object.values(a.ratings).reduce((s, v) => s + v, 0) / 6;
    const rb = Object.values(b.ratings).reduce((s, v) => s + v, 0) / 6;
    return rb - ra;
  });
  badges[byRating[0].slug].push("⭐ Highest Rated");

  const byValue = [...events].sort((a, b) => b.ratings.value - a.ratings.value);
  badges[byValue[0].slug].push("💰 Best Value");

  const byAtmo = [...events].sort((a, b) => b.ratings.atmosphere - a.ratings.atmosphere);
  badges[byAtmo[0].slug].push("🎉 Best Atmosphere");

  const byFood = [...events].sort((a, b) => b.ratings.catering - a.ratings.catering);
  badges[byFood[0].slug].push("🍕 Best Food");

  const byInternet = [...events].sort((a, b) => b.ratings.internet - a.ratings.internet);
  badges[byInternet[0].slug].push("🌐 Best Internet");

  const bySize = [...events].sort((a, b) => b.size - a.size);
  badges[bySize[0].slug].push("🏟️ Biggest");

  return badges;
}

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(["dreamhack-winter", "quakecon"]);

  const selectedEvents = selected.map((s) => lanParties.find((p) => p.slug === s)!).filter(Boolean);
  const badges = getBadges(selectedEvents);

  const addSlot = () => {
    if (selected.length < 3) {
      const unused = comparableEvents.find((e) => !selected.includes(e.slug));
      if (unused) setSelected([...selected, unused.slug]);
    }
  };

  const removeSlot = (index: number) => {
    if (selected.length > 2) {
      setSelected(selected.filter((_, i) => i !== index));
    }
  };

  const updateSlot = (index: number, slug: string) => {
    const next = [...selected];
    next[index] = slug;
    setSelected(next);
  };

  const rows: { label: string; getValue: (e: LanPartyEntry) => string | number; isRating?: boolean }[] = [
    { label: "Size", getValue: (e) => `${e.size.toLocaleString()}+` },
    { label: "Price", getValue: (e) => e.price },
    { label: "Duration", getValue: (e) => e.duration },
    { label: "Internet", getValue: (e) => e.internetSpeed },
    { label: "Games", getValue: (e) => e.games.slice(0, 3).join(", ") },
    { label: "Location", getValue: (e) => `${e.flag} ${e.city}` },
    { label: "Catering", getValue: (e) => e.catering },
    { label: "BYOC", getValue: (e) => e.byoc ? "✅ Yes" : "❌ No" },
    { label: "🌐 Internet", getValue: (e) => e.ratings.internet, isRating: true },
    { label: "🎉 Atmosphere", getValue: (e) => e.ratings.atmosphere, isRating: true },
    { label: "🍕 Catering", getValue: (e) => e.ratings.catering, isRating: true },
    { label: "📋 Organization", getValue: (e) => e.ratings.organization, isRating: true },
    { label: "🏟️ Venue", getValue: (e) => e.ratings.venue, isRating: true },
    { label: "💰 Value", getValue: (e) => e.ratings.value, isRating: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar active="compare" />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            ⚖️ Compare <span className="text-primary">Events</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Compare LAN parties side by side to find the perfect event for you.
          </p>

          {/* Selectors */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {selected.map((slug, i) => (
              <div key={i} className="flex-1 min-w-[200px]">
                <select
                  value={slug}
                  onChange={(e) => updateSlot(i, e.target.value)}
                  className="w-full bg-card border border-border/50 rounded-lg px-3 py-3 text-sm text-foreground"
                >
                  {comparableEvents.map((e) => (
                    <option key={e.slug} value={e.slug}>{e.flag} {e.name}</option>
                  ))}
                </select>
                {selected.length > 2 && (
                  <button onClick={() => removeSlot(i)} className="text-xs text-muted-foreground hover:text-red-400 mt-1">
                    Remove
                  </button>
                )}
              </div>
            ))}
            {selected.length < 3 && (
              <button onClick={addSlot} className="px-4 py-3 rounded-lg border border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors text-sm">
                + Add Event
              </button>
            )}
          </div>

          {/* Badges */}
          <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${selectedEvents.length}, 1fr)` }}>
            {selectedEvents.map((event) => (
              <div key={event.slug} className="text-center">
                <h3 className="font-semibold mb-2">{event.flag} {event.name}</h3>
                <div className="flex flex-wrap justify-center gap-1">
                  {(badges[event.slug] || []).map((badge) => (
                    <span key={badge} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center ${i > 0 ? "border-t border-border/30" : ""} ${i === 8 ? "border-t-2 border-primary/20" : ""}`}
              >
                <div className="w-36 shrink-0 px-4 py-3 text-sm text-muted-foreground font-medium bg-muted/20">
                  {row.label}
                </div>
                {selectedEvents.map((event) => {
                  const val = row.getValue(event);
                  return (
                    <div key={event.slug} className="flex-1 px-4 py-3">
                      {row.isRating ? (
                        <RatingBar value={val as number} />
                      ) : (
                        <span className="text-sm">{val}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Overall rating row */}
            <div className="flex items-center border-t-2 border-primary/30 bg-primary/5">
              <div className="w-36 shrink-0 px-4 py-3 text-sm font-bold text-primary">
                ⭐ Overall
              </div>
              {selectedEvents.map((event) => {
                const overall = Object.values(event.ratings).reduce((a, b) => a + b, 0) / 6;
                return (
                  <div key={event.slug} className="flex-1 px-4 py-3 flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">{overall.toFixed(1)}</span>
                    <Stars rating={overall} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
