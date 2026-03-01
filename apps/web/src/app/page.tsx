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

const featuredEvents = events.slice(0, 6);
const featuredArticle = articles.find((a) => a.featured) || articles[0];
const latestArticles = articles.filter((a) => a !== featuredArticle).slice(0, 4);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[600px] h-[600px] rounded-full border border-primary animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-primary animate-ping" style={{ animationDuration: "3s", animationDelay: "1s" }} />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-primary animate-ping" style={{ animationDuration: "3s", animationDelay: "2s" }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 glow-border">
            <Radar className="w-4 h-4" />
            Your Radar for LAN Parties
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 glow-text">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              LAN Parties
            </span>{" "}
            Across Europe
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Track upcoming events. Read in-depth articles. Relive the best moments through recaps and reviews. By gamers, for gamers — no ads, no BS.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/events" className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 glow-box">
              Browse Events
            </a>
            <a href="/articles" className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors">
              Read Articles
            </a>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section id="articles" className="py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2 glow-text">
                📝 Latest <span className="text-primary">Articles</span>
              </h2>
              <p className="text-muted-foreground">Deep dives into LAN culture, event recaps, and gaming stories.</p>
            </div>
            <a href="/articles" className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Featured Article Hero */}
          <div className="mb-10 rounded-xl overflow-hidden bg-panel border border-border/50 hover:border-primary/30 transition-colors group cursor-pointer glow-border">
            <a href="/articles" className="md:flex">
              <div className="md:w-3/5 aspect-video md:aspect-auto md:min-h-[320px] overflow-hidden">
                <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="md:w-2/5 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">Featured</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/20 text-accent">{featuredArticle.category}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{featuredArticle.author}</span>
                  <span>·</span>
                  <span>{featuredArticle.date}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
            </a>
          </div>

          {/* Article cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArticles.map((article) => (
              <div key={article.slug} className="rounded-xl bg-panel border border-border/50 overflow-hidden hover:border-primary/30 transition-colors group cursor-pointer glow-border">
                <div className="aspect-video overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">{article.category}</span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <a href="/articles" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors">
              View All Articles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section id="events" className="py-24 px-6 border-t border-border/50 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2 glow-text">
                🎮 Upcoming <span className="text-primary">Events</span>
              </h2>
              <p className="text-muted-foreground">Real events. Real dates. Start planning your next adventure.</p>
            </div>
            <a href="/events" className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              All Events <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
            {featuredEvents.map((event) => (
              <a
                key={event.name}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[280px] md:min-w-0 p-5 rounded-xl bg-panel border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group block glow-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold group-hover:text-primary transition-colors">
                    {event.flag} {event.name}
                  </h3>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary/70" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary/70" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-primary/70" />
                    {event.attendance}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <a href="/events" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors">
              View All Events <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4 glow-text">
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
              <div key={f.title} className="p-6 rounded-xl bg-panel border border-border/50 hover:border-primary/30 transition-colors group glow-border">
                <f.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-24 px-6 border-t border-border/50 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4 glow-text">
            Stay in the <span className="text-primary">Loop</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Get a weekly roundup of upcoming LAN events, new articles, and community highlights. No spam — just good stuff for gamers.
          </p>
          <form className="flex gap-3 max-w-md mx-auto" action="#">
            <input type="email" placeholder="your@email.gg" className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 glow-box">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">Unsubscribe anytime. We respect your inbox.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-primary" />
            <span className="font-display">LAN Radar</span>
          </div>
          <span>© 2026 LAN Radar. GG WP.</span>
        </div>
      </footer>
    </div>
  );
}
