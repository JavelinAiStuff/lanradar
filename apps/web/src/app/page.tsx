import {
  Calendar,
  Newspaper,
  Camera,
  Bell,
  Mail,
  Heart,
  MapPin,
  Users,
  ExternalLink,
  ArrowRight,
  Radar,
} from "lucide-react";
import NavBar from "./components/NavBar";
import { events } from "./data/events";
import { articles } from "./data/articles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircuitBackground } from "@/components/thegridcn/circuit-background";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { DataCard } from "@/components/thegridcn/data-card";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { StatusBar } from "@/components/thegridcn/status-bar";

const featuredEvents = events.slice(0, 6);
const featuredArticle = articles.find((a) => a.featured) || articles[0];
const latestArticles = articles.filter((a) => a !== featuredArticle).slice(0, 4);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero */}
      <CircuitBackground className="pt-32 pb-24 px-6">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[600px] h-[600px] rounded-full border border-primary animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-primary animate-ping" style={{ animationDuration: "3s", animationDelay: "1s" }} />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-primary animate-ping" style={{ animationDuration: "3s", animationDelay: "2s" }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <Badge variant="outline" className="mb-8 px-4 py-1.5 text-sm glow-border">
            <Radar className="w-4 h-4 mr-2" />
            YOUR RADAR FOR LAN PARTIES
          </Badge>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase glow-text">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              LAN Parties
            </span>{" "}
            Across Europe
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 tracking-wide">
            Track upcoming events. Read in-depth articles. Relive the best moments through recaps and reviews. By gamers, for gamers — no ads, no BS.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="px-8 py-3 shadow-lg shadow-primary/25 glow-box uppercase tracking-wider">
              <a href="/events">Browse Events</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3 uppercase tracking-wider">
              <a href="/articles">Read Articles</a>
            </Button>
          </div>
        </div>
      </CircuitBackground>

      <StatusBar
        variant="info"
        leftContent={<span>⚡ UPLINK: LAN_RADAR_HQ</span>}
        rightContent={<span>STATUS: ONLINE</span>}
      />

      {/* Latest Articles */}
      <section id="articles" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <UplinkHeader leftText="// ARTICLES" rightText="LATEST TRANSMISSIONS" className="mb-8" />

          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2 uppercase tracking-wider glow-text">
                📝 Latest <span className="text-primary">Articles</span>
              </h2>
              <p className="text-muted-foreground">Deep dives into LAN culture, event recaps, and gaming stories.</p>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex uppercase tracking-wider">
              <a href="/articles">View All <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
          </div>

          {/* Featured Article Hero */}
          <GlowContainer hover intensity="lg" className="mb-10 p-0 overflow-hidden">
            <a href="/articles" className="md:flex">
              <div className="md:w-3/5 aspect-video md:aspect-auto md:min-h-[320px] overflow-hidden">
                <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="md:w-2/5 p-8 flex flex-col justify-center relative">
                <HUDCornerFrame position="top-right" size={40} />
                <HUDCornerFrame position="bottom-left" size={40} />
                <div className="flex items-center gap-2 mb-4">
                  <Badge>FEATURED</Badge>
                  <Badge variant="secondary">{featuredArticle.category}</Badge>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wide">
                  {featuredArticle.title}
                </h3>
                <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono text-xs tracking-wider">
                  <span>{featuredArticle.author}</span>
                  <span>·</span>
                  <span>{featuredArticle.date}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
            </a>
          </GlowContainer>

          {/* Article cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArticles.map((article) => (
              <Card key={article.slug} className="p-0 overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px]">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground font-mono">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-wide text-sm">{article.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-3 font-mono">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button asChild variant="outline" className="uppercase tracking-wider">
              <a href="/articles">View All Articles <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
          </div>
        </div>
      </section>

      <UplinkHeader leftText="// EVENTS" rightText="INCOMING SIGNALS" />

      {/* Featured Events */}
      <section id="events" className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2 uppercase tracking-wider glow-text">
                🎮 Upcoming <span className="text-primary">Events</span>
              </h2>
              <p className="text-muted-foreground">Real events. Real dates. Start planning your next adventure.</p>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex uppercase tracking-wider">
              <a href="/events">All Events <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
            {featuredEvents.map((event) => (
              <a
                key={event.name}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[280px] md:min-w-0 block"
              >
                <DataCard
                  title={`${event.flag} ${event.name}`}
                  fields={[
                    { label: "Date", value: event.date },
                    { label: "Location", value: event.location },
                    { label: "Attendance", value: event.attendance },
                  ]}
                  className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                />
              </a>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button asChild variant="outline" className="uppercase tracking-wider">
              <a href="/events">View All Events <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <UplinkHeader leftText="// FEATURES" rightText="SYSTEM MODULES" className="mb-8" />

          <h2 className="font-display text-3xl font-bold text-center mb-4 uppercase tracking-wider glow-text">
            Your Home Base for <span className="text-primary">LAN Culture</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Everything a LAN enthusiast needs in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: "Upcoming Events", desc: "A curated calendar of LAN parties across Europe and beyond. Never miss a date again." },
              { icon: Newspaper, title: "In-Depth Articles", desc: "Stories about events, gaming culture, scene legends, and the art of the LAN." },
              { icon: Camera, title: "Event Recaps", desc: "Post-event reviews with photos, highlights, and stories from the floor." },
              { icon: Bell, title: "Ticket Alerts", desc: "Get notified the moment ticket sales open so you never miss your seat." },
              { icon: Mail, title: "Newsletter", desc: "A weekly dose of LAN news, event announcements, and community picks." },
              { icon: Heart, title: "Community First", desc: "No ads. No corporate fluff. Built by gamers who've slept under their desks at LANs." },
            ].map((f) => (
              <div key={f.title} className="relative">
                <GlowContainer hover className="h-full">
                  <HUDCornerFrame position="top-left" size={30} />
                  <HUDCornerFrame position="bottom-right" size={30} />
                  <f.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-display font-semibold text-lg mb-2 uppercase tracking-wider">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </GlowContainer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <UplinkHeader leftText="// COMMS" rightText="SUBSCRIBE" />
      <section id="newsletter" className="py-24 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4 uppercase tracking-wider glow-text">
            Stay in the <span className="text-primary">Loop</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Get a weekly roundup of upcoming LAN events, new articles, and community highlights. No spam — just good stuff for gamers.
          </p>
          <form className="flex gap-3 max-w-md mx-auto" action="#">
            <input type="email" placeholder="your@email.gg" className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono" />
            <Button type="submit" className="px-6 py-3 uppercase tracking-wider glow-box">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 font-mono tracking-wider">Unsubscribe anytime. We respect your inbox.</p>
        </div>
      </section>

      {/* Footer */}
      <StatusBar
        leftContent={
          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-primary" />
            <span className="font-display">LAN RADAR</span>
          </div>
        }
        rightContent={<span>© 2026 LAN RADAR. GG WP.</span>}
      />
    </div>
  );
}
