import NavBar from "../components/NavBar";
import { timelineEvents } from "../data/timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LAN Party Timeline",
  description: "The history of LAN parties from 1990 to 2026. Key milestones, legendary events, and the evolution of gaming culture.",
};

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar active="timeline" />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              🕰️ LAN Party <span className="text-primary">Timeline</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From basement gatherings to 60,000-person festivals. The evolution of LAN culture.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Glowing line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary blur-sm opacity-50" />

            <div className="space-y-12">
              {timelineEvents.map((event, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className={`relative flex items-start gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-lg shadow-primary/50" />

                    {/* Spacer for mobile */}
                    <div className="w-12 md:hidden shrink-0" />

                    {/* Content */}
                    <div className={`flex-1 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                        <span className="inline-block text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded mb-2">
                          {event.year}
                        </span>
                        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                      </div>
                    </div>

                    {/* Hidden spacer for desktop */}
                    <div className="hidden md:block flex-1" />
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
