import { notFound } from "next/navigation";
import { Star, MapPin, Users, Clock, Wifi, Globe, ArrowLeft } from "lucide-react";
import NavBar from "../../components/NavBar";
import { lanParties } from "../../data/database";
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
      <span className="text-sm text-muted-foreground w-32 shrink-0">{label}</span>
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
          <a href="/database" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Database
          </a>

          {/* Hero */}
          <div className="relative rounded-xl overflow-hidden mb-8 bg-panel border border-border/50 glow-border">
            <div className="h-48 md:h-64" style={{
              background: `linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(99,102,241,0.1) 50%, rgba(34,211,238,0.05) 100%)`,
            }}>
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <div className="text-4xl mb-2">{party.flag}</div>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-2 glow-text">{party.name}</h1>
                  <p className="text-muted-foreground">{party.city}, {party.country} · {party.dates}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Users, label: "Attendance", value: `${party.size.toLocaleString()}+` },
              { icon: Clock, label: "Duration", value: party.duration },
              { icon: Wifi, label: "Internet", value: party.internetSpeed },
              { icon: Globe, label: "Website", value: party.url.replace("https://", "") },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-panel border border-border/50 glow-border">
                <item.icon className="w-4 h-4 text-primary mb-1" />
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium truncate">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mb-10">{party.description}</p>

          {/* Additional info */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="p-4 rounded-xl bg-panel border border-border/50 glow-border">
              <p className="text-xs text-muted-foreground mb-1">Price Range</p>
              <p className="font-medium">{party.price}</p>
            </div>
            <div className="p-4 rounded-xl bg-panel border border-border/50 glow-border">
              <p className="text-xs text-muted-foreground mb-1">Catering</p>
              <p className="font-medium">{party.catering}</p>
            </div>
            <div className="p-4 rounded-xl bg-panel border border-border/50 glow-border">
              <p className="text-xs text-muted-foreground mb-1">BYOC</p>
              <p className="font-medium">{party.byoc ? "✅ Bring Your Own Computer" : "❌ Equipment Provided"}</p>
            </div>
            <div className="p-4 rounded-xl bg-panel border border-border/50 glow-border">
              <p className="text-xs text-muted-foreground mb-1">Games</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {party.games.map((g) => (
                  <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{g}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="rounded-xl bg-panel border border-border/50 glow-border p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">⭐ Ratings</h2>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{overallRating.toFixed(1)}</div>
                <Stars rating={overallRating} size="lg" />
              </div>
            </div>
            <div className="space-y-4">
              <RatingBar label="🌐 Internet Speed" value={party.ratings.internet} />
              <RatingBar label="🎉 Atmosphere" value={party.ratings.atmosphere} />
              <RatingBar label="🍕 Catering" value={party.ratings.catering} />
              <RatingBar label="📋 Organization" value={party.ratings.organization} />
              <RatingBar label="🏟️ Venue" value={party.ratings.venue} />
              <RatingBar label="💰 Value for Money" value={party.ratings.value} />
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">💬 Reviews</h2>
            <div className="space-y-4">
              {party.reviews.map((review, i) => (
                <div key={i} className="p-4 rounded-xl bg-panel border border-border/50 glow-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{review.author}</span>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rate CTA */}
          <div className="text-center p-8 rounded-xl bg-panel border border-border/50 glow-border">
            <h3 className="text-lg font-bold mb-2">Been to {party.name}?</h3>
            <p className="text-muted-foreground text-sm mb-4">Share your experience and help others find the best events.</p>
            <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-not-allowed opacity-75">
              Rate This Event (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
