"use client";

import { useState } from "react";
import { Copy, Share2, Check } from "lucide-react";
import NavBar from "../components/NavBar";

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
  // Hardware
  { name: "Desktop PC / Laptop", category: "Hardware", conditions: { types: ["byoc", "esports"] } },
  { name: "Monitor (+ stand if needed)", category: "Hardware", conditions: { types: ["byoc"] } },
  { name: "Power cable for PC", category: "Hardware", conditions: { types: ["byoc", "esports"] } },
  { name: "Power strip / extension cord", category: "Hardware", conditions: {} },
  { name: "Console + controllers", category: "Hardware", conditions: { types: ["console"] } },
  { name: "HDMI / DisplayPort cable", category: "Hardware", conditions: {} },
  { name: "Ethernet cable (Cat 6, 5m+)", category: "Hardware", conditions: {} },
  { name: "USB hub", category: "Hardware", conditions: { types: ["byoc", "esports"] } },
  // Peripherals
  { name: "Gaming mouse", category: "Peripherals", conditions: { types: ["byoc", "esports"] } },
  { name: "Mouse pad (XL recommended)", category: "Peripherals", conditions: { types: ["byoc", "esports"] } },
  { name: "Keyboard", category: "Peripherals", conditions: { types: ["byoc", "esports"] } },
  { name: "Headset / earbuds", category: "Peripherals", conditions: {} },
  { name: "Controller", category: "Peripherals", conditions: { types: ["console", "casual"] } },
  { name: "Webcam", category: "Peripherals", conditions: { options: ["streaming"] } },
  { name: "Microphone / stream mic", category: "Peripherals", conditions: { options: ["streaming"] } },
  { name: "Capture card", category: "Peripherals", conditions: { options: ["streaming"] } },
  // Comfort
  { name: "Sleeping bag / blanket", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Pillow", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Air mattress / camping mat", category: "Comfort", conditions: { durations: ["extended"] } },
  { name: "Change of clothes", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Deodorant (please!)", category: "Comfort", conditions: {} },
  { name: "Toothbrush & toiletries", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Ear plugs for sleeping", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  { name: "Eye mask", category: "Comfort", conditions: { durations: ["weekend", "extended"] } },
  // Food & Drinks
  { name: "Water bottle (reusable)", category: "Food & Drinks", conditions: {} },
  { name: "Energy drinks / coffee", category: "Food & Drinks", conditions: {} },
  { name: "Snacks (chips, nuts, candy)", category: "Food & Drinks", conditions: {} },
  { name: "Cup noodles / easy meals", category: "Food & Drinks", conditions: { durations: ["weekend", "extended"] } },
  // Documents
  { name: "Ticket / QR code", category: "Documents", conditions: {} },
  { name: "ID / photo ID", category: "Documents", conditions: {} },
  { name: "Cash + card", category: "Documents", conditions: {} },
  { name: "Team registration details", category: "Documents", conditions: { options: ["competitive"] } },
  // Extras
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
  const [step, setStep] = useState(1);
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
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 glow-text">
              What Should I Bring? <span className="text-primary">✅</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Generate a personalized packing list for your next LAN party.
            </p>
          </div>

          {/* Fun stat */}
          <div className="text-center mb-10 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-primary">📊 Did you know? {randomStat}</p>
          </div>

          {/* Step 1 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Step 1: What type of event?</h2>
            <div className="grid grid-cols-2 gap-3">
              {eventTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setEventType(t.id); if (!duration) setStep(2); }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    eventType === t.id
                      ? "bg-primary/10 border-primary/30 text-foreground"
                      : "bg-card border-border/50 text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  <div className="text-lg mb-1">{t.label}</div>
                  <div className="text-xs">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Step 2: How long?</h2>
            <div className="flex gap-3">
              {durations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setDuration(d.id); setStep(3); }}
                  className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                    duration === d.id
                      ? "bg-primary/10 border-primary/30 text-foreground"
                      : "bg-card border-border/50 text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Step 3: Additional options</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { id: "streaming", label: "📹 Streaming Setup" },
                { id: "competitive", label: "⚔️ Competitive Play" },
                { id: "firsttimer", label: "🆕 First Timer" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                    options.has(opt.id)
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-card border-border/50 text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {showResults && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Your Checklist ({generatedItems.length} items)</h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyList}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-panel border border-border/50 glow-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-panel border border-border/50 glow-border text-sm text-muted-foreground hover:text-foreground transition-colors cursor-not-allowed opacity-75">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground mb-4">
                {checked.size} of {generatedItems.length} packed
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-8">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${generatedItems.length > 0 ? (checked.size / generatedItems.length) * 100 : 0}%` }} />
              </div>

              <div className="space-y-6">
                {categories.map((cat) => (
                  <div key={cat}>
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{cat}</h3>
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
                          <span className={`text-sm ${checked.has(item.name) ? "line-through text-muted-foreground" : ""}`}>
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
    </div>
  );
}
