import { Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircuitBackground } from "@/components/thegridcn/circuit-background";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";
import { AnomalyBanner } from "@/components/thegridcn/anomaly-banner";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <CircuitBackground className="w-full max-w-md py-16">
        <div className="text-center relative">
          <HUDCornerFrame position="top-left" size={80} />
          <HUDCornerFrame position="top-right" size={80} />
          <HUDCornerFrame position="bottom-left" size={80} />
          <HUDCornerFrame position="bottom-right" size={80} />

          <div className="relative inline-block mb-8">
            <Radar className="w-20 h-20 text-primary opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-extrabold text-primary font-mono">404</span>
            </div>
          </div>

          <AnomalyBanner title="SIGNAL LOST" subtitle="ERROR 404" className="mb-8" />

          <p className="text-muted-foreground mb-8 font-mono text-sm tracking-wider">
            Our radar couldn&apos;t pick up this page. It might have moved, been deleted, or never existed in the first place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="uppercase tracking-wider glow-box">
              <a href="/">Back to Base</a>
            </Button>
            <Button asChild variant="outline" className="uppercase tracking-wider">
              <a href="/events">Browse Events</a>
            </Button>
          </div>
        </div>
      </CircuitBackground>
    </div>
  );
}
