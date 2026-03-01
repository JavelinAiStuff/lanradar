import { Radar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <Radar className="w-20 h-20 text-primary opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-extrabold text-primary">404</span>
          </div>
        </div>
        <h1 className="font-display text-3xl font-extrabold mb-4 glow-text">
          Signal <span className="text-primary">Lost</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Our radar couldn&apos;t pick up this page. It might have moved, been deleted, or never existed in the first place.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Base
          </a>
          <a
            href="/events"
            className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
          >
            Browse Events
          </a>
        </div>
      </div>
    </div>
  );
}
