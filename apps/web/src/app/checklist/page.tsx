"use client";

import { useState } from "react";
import { Copy, Share2, Check } from "lucide-react";
import NavBar from "../components/NavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { DataCard } from "@/components/thegridcn/data-card";
import { AnomalyBanner } from "@/components/thegridcn/anomaly-banner";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";

const eventTypes = [
  { id: "byoc", label: "🖥️ BYOC LAN", desc: "Bring your own computer" },
  { id: "console", label: "🎮 Console LAN", desc: "Console gaming focus" },
  { id: "esports", label: "🏆 Esports Tournament", desc: "Competitive event" },
  { id: "casual", label: "🎲 Casual Weekend", desc: "Relaxed gaming with friends" },
];

const durations = [
  { id: "1day", label: "1 Day" },
  { id: "weekend", label: "Weekend (2-3 days)" },
  { id: "extended", label: "3+ Days" },
];

interface ChecklistItem {
  name: string;
  category: string;
  conditions: { types?: string[]; durations?: string[]; options?: string[] };
}

const allItems: ChecklistItem[] = [
  { name: "Desktop PC / Laptop", category: "Hardware", conditions: { types: ["byoc", "esports"] } },
  { name: "Monitor (+ stand if needed)", category: "Hardware", conditions: { types: ["byoc"] } },
  { name: "Power cable for PC", category: "Hardware", conditions: { types: ["byoc", "esports"] } },
  { name: "Power strip / extension cord", category: "Hardware", conditions: {} },
  { name: "Console + controllers", category: "Hardware", conditions: { types: ["console"] } },
  { name: "HDMI / DisplayPort cable", category: "Hardware", conditions: {} },
  { name: "Ethernet cable (Cat 6, 5m+)", category: "Hardware", conditions: {} },
  { name: "USB hub", category: "Hardware", conditions: { types: ["byoc", "esports"] } },
  { name: "Gaming mouse", category: "Peripherals", conditions: { types: ["byoc", "esports"] } },
  { name: "Mouse pad (XL recommended)", category: "Peripherals", conditions: { types: ["byoc", "esports"] } },
  { name: "Keyboard", category: "Peripherals", conditions: { types: ["byoc", "esports"] } },
  { name: "Headset / earbuds", category: "Peripherals", conditions: {} },
  { name: "Controller", category: "Peripherals", conditions: { types: ["console", "casual"] } },
  { name: "Webcam", category: "Peripherals", conditions: { options: ["streaming"] } },
  { name: "Microphone / stream mic", category: "Peripherals", conditions: { options: ["streaming"] } },
  { name: "Capture card", category: "Peripherals", conditions: { options: ["streaming"] } },
  { name: "Sleeping bag / blanket", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Pillow", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Air mattress / camping mat", category: "Comfort", conditions: { durations: ["extended"] } },
  { name: "Change of clothes", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Deodorant (please!)", category: "Comfort", conditions: {} },
  { name: "Toothbrush & toiletries", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Ear plugs for sleeping", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Eye mask", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Water bottle (reusable)", category: "Food & Drinks", conditions: {} },
  { name: "Energy drinks / coffee", category: "Food & Drinks", conditions: {} },
  { name: "Snacks (chips, nuts, candy)", category: "Food & Drinks", conditions: {} },
  { name: "Cup noodles / easy meals", category: "Food & Drinks", conditions: { durations: ["weekend", "extended"] } },
  { name: "Ticket / QR code", category: "Documents", conditions: {} },
  { name: "ID / photo ID", category: "Documents", conditions: {} },
  { name: "Cash + card", category: "Documents", conditions: {} },
  { name: "Team registration details", category: "Documents", conditions: { options: ["competitive"] } },
  { name: "LED strip for desk bling", category: "Extras", conditions: { types: ["byoc"] } },
  { name: "Multi-plug phone charger", category: "Extras", conditions: {} },
  { name: "Portable speaker (for your corner)", category: "Extras", conditions: { types: ["casual"] } },
  { name: "Board games / card games", category: "Extras", conditions: { types: ["casual"] } },
  { name: "Extra ethernet cable", category: "Extras", conditions: {} },
  { name: "LAN party survival guide (this!)", category: "Extras", conditions: { options: ["firsttimer"] } },
];

const funStats = [
  "87% of LAN-goers forget their ethernet cable",
  "The average gamer consumes 4.2 energy drinks per LAN day",
  "23% of first-timers forget deodorant. Don't be that person.",
  "DreamHack uses enough ethernet cable to circle a football field 47 times",
];

export default function ChecklistPage() {
  const [eventType, setEventType] = useState("");
  const [duration, setDuration] = useState("");
  const [options, setOptions] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const toggleOption = (opt: string) => {
    setOptions((prev) => {
      const next = new Set(prev);
      if (next.has(opt)) next.delete(opt);
      else next.add(opt);
      return next;
    });
  };

  const generatedItems = allItems.filter((item) => {
    const c = item.conditions;
    if (c.types && c.types.length > 0 && !c.types.includes(eventType)) return false;
    if (c.durations && c.durations.length > 0 && !c.durations.includes(duration)) return false;
    if (c.options && c.options.length > 0 && !c.options.some((o) => options.has(o))) return false;
    return true;
  });

  const categories = [...new Set(generatedItems.map((i) => i.category))];

  const copyList = () => {
    const text = categories
      .map((cat) => `## ${cat}\n${generatedItems.filter((i) => i.category === cat).map((i) => `- [ ] ${i.name}`).join("\n")}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showResults = eventType && duration;
  const randomStat = funStats[Math.floor(Date.now() / 10000) % funStats.length];

  return (
    <div className="min-h-screen bg-background">
      <NavBar active="checklist" />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <UplinkHeader leftText="// LOADOUT GENERATOR" rightText="CHECKLIST" className="mb-8" />

          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider glow-text">
              What Should I Bring? <span className="text-primary">✅</span>
            </h1>
            <p className="text-muted-foreground text-lg tracking-wide">
              Generate a personalized packing list for your next LAN party.
            </p>
          </div>

          {/* Fun stat */}
          <AnomalyBanner title={randomStat} subtitle="DID YOU KNOW?" animated={false} className="mb-10" />

          {/* Step 1 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider font-display">Step 1: What type of event?</h2>
            <div className="grid grid-cols-2 gap-3">
              {eventTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setEventType(t.id)}
                  className="text-left"
                >
                  <GlowContainer
                    hover
                    intensity={eventType === t.id ? "lg" : "sm"}
                    className={`h-full ${eventType === t.id ? "border-primary/50" : ""}`}
                  >
                    <div className="text-lg mb-1">{t.label}</div>
                    <div className="text-xs text-muted-foreground font-mono">{t.desc}</div>
                  </GlowContainer>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider font-display">Step 2: How long?</h2>
            <div className="flex gap-3">
              {durations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDuration(d.id)}
                  className="flex-1"
                >
                  <GlowContainer
                    hover
                    intensity={duration === d.id ? "lg" : "sm"}
                    className={`text-center h-full ${duration === d.id ? "border-primary/50" : ""}`}
                  >
                    <span className="font-mono text-sm uppercase tracking-wider">{d.label}</span>
                  </GlowContainer>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider font-display">Step 3: Additional options</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { id: "streaming", label: "📹 Streaming Setup" },
                { id: "competitive", label: "⚔️ Competitive Play" },
                { id: "firsttimer", label: "🆕 First Timer" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                >
                  <Badge
                    variant={options.has(opt.id) ? "default" : "outline"}
                    className="px-4 py-2 text-sm cursor-pointer"
                  >
                    {opt.label}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {showResults && (
            <div>
              <UplinkHeader leftText={`// LOADOUT: ${generatedItems.length} ITEMS`} rightText="READY" className="mb-6" />

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider font-display">Your Checklist ({generatedItems.length} items)</h2>
                <div className="flex gap-2">
                  <Button onClick={copyList} variant="outline" size="sm" className="uppercase tracking-wider">
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="outline" size="sm" disabled className="uppercase tracking-wider opacity-75">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </Button>
                </div>
              </div>

              <DataCard
                title="Packing Progress"
                fields={[
                  { label: "Packed", value: `${checked.size} / ${generatedItems.length}`, highlight: checked.size === generatedItems.length },
                  { label: "Percentage", value: `${generatedItems.length > 0 ? Math.round((checked.size / generatedItems.length) * 100) : 0}%` },
                ]}
                className="mb-8"
              />

              <div className="space-y-6">
                {categories.map((cat) => (
                  <div key={cat}>
                    <h3 className="text-[10px] font-mono font-semibold text-primary uppercase tracking-[0.3em] mb-3">{cat}</h3>
                    <div className="space-y-1">
                      {generatedItems.filter((i) => i.category === cat).map((item) => (
                        <label key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={checked.has(item.name)}
                            onChange={() => {
                              setChecked((prev) => {
                                const next = new Set(prev);
                                if (next.has(item.name)) next.delete(item.name);
                                else next.add(item.name);
                                return next;
                              });
                            }}
                            className="w-4 h-4 rounded accent-primary"
                          />
                          <span className={`text-sm font-mono ${checked.has(item.name) ? "line-through text-muted-foreground" : ""}`}>
                            {item.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <StatusBar
        leftContent={<span>⚡ LOADOUT</span>}
        rightContent={showResults ? <span>{checked.size} / {generatedItems.length} PACKED</span> : <span>CONFIGURE LOADOUT</span>}
      />
    </div>
  );
}
