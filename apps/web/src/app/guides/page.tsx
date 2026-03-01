"use client";

import { useState } from "react";
import { ChevronDown, Download, Quote } from "lucide-react";
import NavBar from "../components/NavBar";

const sections = [
  {
    emoji: "📋",
    title: "Planning & Preparation",
    content: `Start 3-6 months ahead. Define your event size (10 friends? 100 strangers? 500+ BYOC seats?), budget, and goals. Create a timeline with milestones: venue booking, network equipment, ticket sales, marketing. Use a project management tool and build a core team of 3-5 reliable people. Budget for unexpected costs — add 20% buffer. Research local regulations for public events.`,
    checklist: ["Define event size and type", "Set budget with 20% buffer", "Build core organizing team", "Create project timeline", "Research local event regulations"],
  },
  {
    emoji: "🏟️",
    title: "Finding a Venue",
    content: `The venue makes or breaks your LAN. Requirements: sufficient power outlets (at least 300W per seat), adequate cooling/ventilation, accessible location with parking, strong cellular signal for backup, loading dock for equipment, and 24-hour access if overnight. Community halls, sports halls, and convention centers work well. Visit venues in person — photos lie. Check power capacity with the venue manager and get it in writing.`,
    checklist: ["Calculate power requirements", "Visit venues in person", "Check ventilation and cooling", "Confirm 24-hour access", "Verify parking availability", "Get power capacity in writing"],
  },
  {
    emoji: "🌐",
    title: "Network Setup",
    content: `The network is your most critical infrastructure. For small LANs (<50): quality consumer switch and router. For medium (50-200): managed switches, proper DHCP server, VLANs for gaming vs general traffic. For large (200+): enterprise-grade switches, redundant uplinks, dedicated network team, QoS policies. Always have a dedicated DHCP server — never rely on a consumer router for 100+ devices. Bring spare cables and switches. Test everything 24 hours before doors open.`,
    checklist: ["Plan network topology", "Source switches and cabling", "Set up DHCP server", "Configure VLANs if needed", "Prepare spare equipment", "Test full setup 24h before"],
  },
  {
    emoji: "🎮",
    title: "Games & Tournaments",
    content: `Offer a mix of competitive tournaments and casual play. Popular choices: CS2, Valorant, Rocket League, League of Legends for competitive; Minecraft, Factorio, Age of Empires for casual. Use established tournament platforms (Challonge, start.gg) for brackets. Have clear rules published in advance. Prizes don't need to be expensive — trophies, peripherals, or even just bragging rights work. Schedule finals during peak hours for maximum hype.`,
    checklist: ["Choose tournament games", "Set up bracket system", "Write and publish rules", "Source prizes", "Schedule tournament timeline", "Recruit referees/admins"],
  },
  {
    emoji: "🍕",
    title: "Food & Drinks",
    content: `Gamers need fuel. Options by scale: Small: pre-order pizza, bulk snacks and drinks. Medium: partner with local food trucks or catering. Large: dedicated food court area. Always provide free water. Energy drinks and coffee are essential. Consider dietary restrictions. If alcohol is served, have a clear policy and security. A well-fed LAN is a happy LAN — don't skimp on this.`,
    checklist: ["Plan catering approach", "Ensure free water availability", "Stock energy drinks and coffee", "Consider dietary restrictions", "Set alcohol policy if applicable", "Arrange food truck/catering partners"],
  },
  {
    emoji: "📢",
    title: "Promotion & Community",
    content: `Build hype early. Create social media presence 2-3 months before. Post regular updates, teasers, game announcements. Partner with local gaming communities, Discord servers, and streamer. Early bird ticket pricing creates urgency. Create a Discord server for your event — it becomes your primary communication channel. After the event, share photos, highlights, and thank attendees. The post-event community is your pre-marketing for next time.`,
    checklist: ["Create social media accounts", "Set up event Discord server", "Design promotional materials", "Launch early bird tickets", "Partner with local communities", "Plan post-event content"],
  },
];

const tips = [
  { author: "DreamHack Veteran", text: "Label. Every. Cable. You'll thank yourself at 3 AM when something goes down." },
  { author: "10-Year LAN Organizer", text: "Your network admin is the most important person at the event. Pay them in pizza and respect." },
  { author: "Frag-o-Matic Crew", text: "Always have a quiet chill zone. Not everyone wants to hear dubstep at 4 AM." },
  { author: "Assembly Organizer", text: "The first event won't be perfect. That's fine. The community will come back if you're genuine." },
];

export default function GuidesPage() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleSection = (i: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allChecklistItems = sections.flatMap((s) => s.checklist);
  const checkedCount = allChecklistItems.filter((item) => checkedItems.has(item)).length;
  const progress = allChecklistItems.length > 0 ? (checkedCount / allChecklistItems.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <NavBar active="guides" />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 glow-text">
            Start Your Own LAN Party <span className="text-primary">🎮</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Everything you need to know to organize your first (or next) LAN party. From planning to post-event, we&apos;ve got you covered.
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 space-y-4">
              {sections.map((section, i) => (
                <div key={i} className="rounded-xl bg-panel border border-border/50 glow-border overflow-hidden">
                  <button
                    onClick={() => toggleSection(i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <h2 className="text-lg font-semibold">
                      {section.emoji} {section.title}
                    </h2>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openSections.has(i) ? "rotate-180" : ""}`} />
                  </button>
                  {openSections.has(i) && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{section.content}</p>
                      <div className="space-y-2">
                        {section.checklist.map((item) => (
                          <label key={item} className="flex items-center gap-3 text-sm cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={checkedItems.has(item)}
                              onChange={() => toggleCheck(item)}
                              className="w-4 h-4 rounded border-border accent-primary"
                            />
                            <span className={`${checkedItems.has(item) ? "line-through text-muted-foreground" : "text-foreground"} group-hover:text-primary transition-colors`}>
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:w-72 space-y-6">
              {/* Progress */}
              <div className="p-5 rounded-xl bg-panel border border-border/50 glow-border">
                <h3 className="font-semibold mb-3">📊 Your Progress</h3>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-sm text-muted-foreground">{checkedCount} of {allChecklistItems.length} tasks done</p>
              </div>

              {/* Download */}
              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium text-sm hover:bg-primary/20 transition-colors cursor-not-allowed opacity-75">
                <Download className="w-4 h-4" /> Download Checklist (PDF) — Soon
              </button>

              {/* Tips */}
              <div className="space-y-4">
                <h3 className="font-semibold">💡 Tips from the Pros</h3>
                {tips.map((tip, i) => (
                  <div key={i} className="p-4 rounded-xl bg-panel border border-border/50 glow-border">
                    <Quote className="w-4 h-4 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground italic mb-2">&ldquo;{tip.text}&rdquo;</p>
                    <p className="text-xs text-primary">— {tip.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
