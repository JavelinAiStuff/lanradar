"use client";

import { useState } from "react";
import { Camera, Upload, Tag, Heart } from "lucide-react";
import NavBar from "../components/NavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";
import { CircuitBackground } from "@/components/thegridcn/circuit-background";

const events = [
  "DreamHack Winter 2025",
  "Assembly Summer 2025",
  "QuakeCon 2025",
  "Insomnia i72",
  "Frag-o-Matic 25.1",
  "The Gathering 2025",
];

const photos = [
  { id: 1, event: "DreamHack Winter 2025", date: "Nov 2025", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop", wasThereCount: 342 },
  { id: 2, event: "DreamHack Winter 2025", date: "Nov 2025", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop", wasThereCount: 128 },
  { id: 3, event: "Assembly Summer 2025", date: "Aug 2025", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop", wasThereCount: 87 },
  { id: 4, event: "QuakeCon 2025", date: "Aug 2025", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=400&h=300&fit=crop", wasThereCount: 256 },
  { id: 5, event: "DreamHack Winter 2025", date: "Nov 2025", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop", wasThereCount: 94 },
  { id: 6, event: "Insomnia i72", date: "Apr 2025", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop", wasThereCount: 67 },
  { id: 7, event: "Assembly Summer 2025", date: "Aug 2025", image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=300&fit=crop", wasThereCount: 143 },
  { id: 8, event: "Frag-o-Matic 25.1", date: "Jun 2025", image: "https://images.unsplash.com/photo-1548686304-89d188a80029?w=400&h=300&fit=crop", wasThereCount: 38 },
  { id: 9, event: "The Gathering 2025", date: "Apr 2025", image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop", wasThereCount: 201 },
  { id: 10, event: "QuakeCon 2025", date: "Aug 2025", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&q=80", wasThereCount: 178 },
  { id: 11, event: "The Gathering 2025", date: "Apr 2025", image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop", wasThereCount: 112 },
  { id: 12, event: "DreamHack Winter 2025", date: "Nov 2025", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", wasThereCount: 89 },
];

export default function GalleryPage() {
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [wasThere, setWasThere] = useState<Set<number>>(new Set());

  const filtered = selectedEvent === "All" ? photos : photos.filter((p) => p.event === selectedEvent);

  const toggleWasThere = (id: number) => {
    setWasThere((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar active="gallery" />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <UplinkHeader leftText="// VISUAL ARCHIVE" rightText="GALLERY" className="mb-8" />

          {/* Hero */}
          <CircuitBackground className="text-center mb-12 py-8 rounded-xl">
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-4 uppercase tracking-wider glow-text">
              Were You There? <span className="text-primary">📸</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto tracking-wide">
              Relive the best moments from LAN parties around the world. Tag yourself, share memories, and prove you were there.
            </p>
          </CircuitBackground>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground font-mono"
            >
              <option value="All">All Events</option>
              {events.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>

            <Button variant="outline" disabled className="uppercase tracking-wider opacity-75">
              <Upload className="w-4 h-4" /> Share Your Photos (Coming Soon)
            </Button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((photo) => (
              <Card key={photo.id} className="p-0 overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={photo.image} alt={photo.event} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate uppercase tracking-wide">{photo.event}</p>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">{photo.date}</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleWasThere(photo.id)}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors font-mono ${
                        wasThere.has(photo.id)
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${wasThere.has(photo.id) ? "fill-primary" : ""}`} />
                      I was there! ({photo.wasThereCount + (wasThere.has(photo.id) ? 1 : 0)})
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-mono">
                      <Tag className="w-3 h-3" /> Tag
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-display uppercase tracking-wider">No photos yet for this event</p>
              <p className="text-sm font-mono">Be the first to share!</p>
            </div>
          )}
        </div>
      </div>

      <StatusBar
        leftContent={<span>⚡ GALLERY</span>}
        rightContent={<span>{filtered.length} IMAGES</span>}
      />
    </div>
  );
}
