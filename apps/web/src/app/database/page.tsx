"use client";

import { useState, useMemo } from "react";
import { Search, Star, ExternalLink, MapPin, Users, Filter, X } from "lucide-react";
import NavBar from "../components/NavBar";
import { lanParties, allGames, allCountries, allRegions } from "../data/database";
import EventMap from "../../components/EventMap";

const cityCoords: Record<string, [number, number]> = {
  "Jönköping": [57.78, 14.16],
  "Helsinki": [60.17, 24.94],
  "Dallas, Texas": [32.78, -96.8],
  "Birmingham": [52.49, -1.89],
  "Cologne": [50.94, 6.96],
  "Wieze": [51.0, 4.02],
  "Enschede": [52.22, 6.89],
  "Utrecht": [52.09, 5.12],
  "Stockholm": [59.33, 18.07],
  "Stafford": [52.81, -2.12],
  "Hannover": [52.37, 9.74],
  "Hamar": [60.79, 11.07],
  "Bilbao": [43.26, -2.93],
  "Tampere": [61.5, 23.79],
};

const sizeCategories = [
  { value: "small", label: "Small (<100)", max: 100 },
  { value: "medium", label: "Medium (100–500)", max: 500 },
  { value: "large", label: "Large (500–2000)", max: 2000 },
  { value: "massive", label: "Massive (2000+)", max: Infinity },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function DatabasePage() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [gameFilter, setGameFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return lanParties.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
      if (countryFilter !== "All" && p.country !== countryFilter) return false;
      if (regionFilter !== "All" && p.region !== regionFilter) return false;
      if (sizeFilter !== "All" && p.sizeCategory !== sizeFilter) return false;
      if (gameFilter !== "All" && !p.games.includes(gameFilter)) return false;
      return true;
    });
  }, [search, countryFilter, regionFilter, sizeFilter, gameFilter]);

  const activeFilters = [countryFilter, regionFilter, sizeFilter, gameFilter].filter((f) => f !== "All").length;

  const mapEvents = filtered
    .map((p) => {
      const coords = cityCoords[p.city];
      if (!coords) return null;
      return { name: p.name, lat: coords[0], lng: coords[1], flag: p.flag, date: p.dates };
    })
    .filter(Boolean) as { name: string; lat: number; lng: number; flag: string; date: string }[];

  return (
    <div className="min-h-screen bg-background">
      <NavBar active="database" />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 glow-text">
            🗃️ LAN Party <span className="text-primary">Database</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
            Search and discover LAN parties across Europe and North America. Filter by country, size, and games.
          </p>

          {/* Interactive Map */}
          <div className="mb-10">
            <EventMap events={mapEvents} />
          </div>

          {/* Search + Filter toggle */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search LAN parties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-panel border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                showFilters || activeFilters > 0 ? "bg-primary/10 border-primary/30 text-primary" : "bg-panel border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters{activeFilters > 0 && ` (${activeFilters})`}
            </button>
          </div>

          <div className="flex gap-8">
            {/* Filter sidebar */}
            {showFilters && (
              <div className="w-64 shrink-0 space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Country</label>
                  <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="w-full bg-panel border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground">
                    <option value="All">All Countries</option>
                    {allCountries.map((c) => {
                      const flag = lanParties.find((p) => p.country === c)?.flag;
                      return <option key={c} value={c}>{flag} {c}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Region</label>
                  <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="w-full bg-panel border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground">
                    <option value="All">All Regions</option>
                    {allRegions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Size</label>
                  <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)} className="w-full bg-panel border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground">
                    <option value="All">All Sizes</option>
                    {sizeCategories.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Games</label>
                  <select value={gameFilter} onChange={(e) => setGameFilter(e.target.value)} className="w-full bg-panel border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground">
                    <option value="All">All Games</option>
                    {allGames.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                {activeFilters > 0 && (
                  <button
                    onClick={() => { setCountryFilter("All"); setRegionFilter("All"); setSizeFilter("All"); setGameFilter("All"); }}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    <X className="w-3 h-3" /> Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Results */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((party) => (
                  <a
                    key={party.slug}
                    href={`/database/${party.slug}`}
                    className="p-5 rounded-xl bg-panel border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group block glow-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                        {party.flag} {party.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{party.city}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{party.size.toLocaleString()}+</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{party.dates}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {party.games.slice(0, 3).map((g) => (
                        <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{g}</span>
                      ))}
                      {party.games.length > 3 && <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">+{party.games.length - 3}</span>}
                    </div>
                    <Stars rating={party.rating} />
                  </a>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-lg mb-2">No events found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
