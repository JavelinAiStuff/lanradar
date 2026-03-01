import { notFound } from "next/navigation";
import { Star, MapPin, Users, Clock, Wifi, Globe, ArrowLeft } from "lucide-react";
import NavBar from "../../components/NavBar";
import { lanParties } from "../../data/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { DataCard } from "@/components/thegridcn/data-card";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";
import { CircuitBackground } from "@/components/thegridcn/circuit-background";
import type { Metadata } from "next";

export function generateStaticParams() {
  return lanParties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const party = lanParties.find((p) => p.slug === params.slug);
  if (!party) return { title: "Not Found" };
  return { title: `${party.name} — LAN Party Rating`, description: party.description };
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const s = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-muted-foreground w-32 shrink-0 font-mono uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <Stars rating={value} />
    </div>
  );
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const party = lanParties.find((p) => p.slug === params.slug);
  if (!party) notFound();

  const overallRating = Object.values(party.ratings).reduce((a, b) => a + b, 0) / Object.values(party.ratings).length;

  return (
    <div className="min-h-screen bg-background">
      <NavBar active="database" />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="mb-6 uppercase tracking-wider">
            <a href="/database">
              <ArrowLeft className="w-4 h-4" /> Back to Database
            </a>
          </Button>

          <UplinkHeader leftText={`// ${party.name.toUpperCase()}`} rightText="EVENT DETAIL" className="mb-6" />

          {/* Hero */}
          <CircuitBackground className="relative rounded-xl overflow-hidden mb-8 border border-border glow-border">
            <div className="h-48 md:h-64 relative">
              <HUDCornerFrame position="top-left" />
              <HUDCornerFrame position="top-right" />
              <HUDCornerFrame position="bottom-left" />
              <HUDCornerFrame position="bottom-right" />
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <div className="text-4xl mb-2">{party.flag}</div>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-2 uppercase tracking-wider glow-text">{party.name}</h1>
                  <p className="text-muted-foreground font-mono text-sm tracking-wider">{party.city}, {party.country} · {party.dates}</p>
                </div>
              </div>
            </div>
          </CircuitBackground>

          {/* Key details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Users, label: "Attendance", value: `${party.size.toLocaleString()}+` },
              { icon: Clock, label: "Duration", value: party.duration },
              { icon: Wifi, label: "Internet", value: party.internetSpeed },
              { icon: Globe, label: "Website", value: party.url.replace("https://", "") },
            ].map((item) => (
              <DataCard
                key={item.label}
                fields={[{ label: item.label, value: item.value }]}
                className="text-center"
              />
            ))}
          </div>

          <p className="text-muted-foreground mb-10 tracking-wide">{party.description}</p>

          {/* Additional info */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <DataCard fields={[{ label: "Price Range", value: party.price }]} />
            <DataCard fields={[{ label: "Catering", value: party.catering }]} />
            <DataCard fields={[{ label: "BYOC", value: party.byoc ? "✅ Bring Your Own Computer" : "❌ Equipment Provided" }]} />
            <GlowContainer hover className="relative">
              <HUDCornerFrame position="top-left" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-foreground/80 mb-2">Games</p>
              <div className="flex flex-wrap gap-1">
                {party.games.map((g) => (
                  <Badge key={g} variant="secondary" className="text-[10px]">{g}</Badge>
                ))}
              </div>
            </GlowContainer>
          </div>

          {/* Ratings */}
          <GlowContainer hover={false} intensity="lg" className="mb-10 relative">
            <HUDCornerFrame position="top-left" />
            <HUDCornerFrame position="top-right" />
            <HUDCornerFrame position="bottom-left" />
            <HUDCornerFrame position="bottom-right" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wider font-display">⭐ Ratings</h2>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-mono glow-text">{overallRating.toFixed(1)}</div>
                <Stars rating={overallRating} size="lg" />
              </div>
            </div>
            <div className="space-y-4">
              <RatingBar label="🌐 Internet" value={party.ratings.internet} />
              <RatingBar label="🎉 Atmosphere" value={party.ratings.atmosphere} />
              <RatingBar label="🍕 Catering" value={party.ratings.catering} />
              <RatingBar label="📋 Organization" value={party.ratings.organization} />
              <RatingBar label="🏟️ Venue" value={party.ratings.venue} />
              <RatingBar label="💰 Value" value={party.ratings.value} />
            </div>
          </GlowContainer>

          {/* Reviews */}
          <div className="mb-10">
            <UplinkHeader leftText="// REVIEWS" rightText={`${party.reviews.length} ENTRIES`} className="mb-4" />
            <div className="space-y-4">
              {party.reviews.map((review, i) => (
                <GlowContainer key={i} hover className="relative">
                  <HUDCornerFrame position="top-left" size={20} />
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm font-mono uppercase tracking-wider">{review.author}</span>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
                </GlowContainer>
              ))}
            </div>
          </div>

          {/* Rate CTA */}
          <GlowContainer hover={false} intensity="lg" className="text-center relative">
            <HUDCornerFrame position="top-left" size={40} />
            <HUDCornerFrame position="bottom-right" size={40} />
            <h3 className="text-lg font-bold mb-2 uppercase tracking-wider font-display">Been to {party.name}?</h3>
            <p className="text-muted-foreground text-sm mb-4 font-mono tracking-wider">Share your experience and help others find the best events.</p>
            <Button disabled className="uppercase tracking-wider opacity-75">
              Rate This Event (Coming Soon)
            </Button>
          </GlowContainer>
        </div>
      </div>

      <StatusBar
        leftContent={<span>⚡ {party.name.toUpperCase()}</span>}
        rightContent={<span>RATING: {overallRating.toFixed(1)} / 5.0</span>}
      />
    </div>
  );
}
