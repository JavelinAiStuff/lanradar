import {
  Radar,
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
} from "lucide-react";

const featuredEvents = [
  {
    name: "Gamescom LAN 2026",
    date: "March 20–22, 2026",
    location: "Cologne, Germany",
    attendance: "3,000+",
    url: "https://lan.gamescom.global",
  },
  {
    name: "DreamHack Birmingham",
    date: "March 27–29, 2026",
    location: "Birmingham, UK",
    attendance: "25,000+",
    url: "https://dreamhack.com",
  },
  {
    name: "Assembly Summer 2026",
    date: "July 30 – August 2, 2026",
    location: "Helsinki, Finland",
    attendance: "5,000+",
    url: "https://assembly.org",
  },
  {
    name: "QuakeCon 2026",
    date: "August 6–9, 2026",
    location: "Dallas, Texas, USA",
    attendance: "10,000+",
    url: "https://quakecon.org",
  },
  {
    name: "DreamHack Stockholm 2026",
    date: "November 27–29, 2026",
    location: "Stockholm, Sweden",
    attendance: "60,000+",
    url: "https://dreamhack.com/stockholm",
  },
  {
    name: "Gamescom 2026",
    date: "August 19–23, 2026",
    location: "Cologne, Germany",
    attendance: "300,000+",
    url: "https://www.gamescom.global",
  },
];

const articles = [
  {
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    title: "What Makes a Great LAN Party?",
    excerpt:
      "From the network setup to the snack table — we break down what separates a legendary LAN from a laggy mess.",
    author: "LAN Radar Team",
    date: "Feb 20, 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
    title: "DreamHack Summer 2025: A Recap",
    excerpt:
      "60,000 gamers, three days of nonstop gaming, and memories for a lifetime. Here's what went down in Stockholm.",
    author: "Alex R.",
    date: "Feb 12, 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop",
    title: "The Rise of Community LANs",
    excerpt:
      "Forget the mega-events. Small community LANs are making a massive comeback across Europe — and here's why.",
    author: "Sam K.",
    date: "Jan 28, 2026",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border/50 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radar className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">LAN Radar</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a
              href="#events"
              className="hover:text-foreground transition-colors"
            >
              Events
            </a>
            <a
              href="#articles"
              className="hover:text-foreground transition-colors"
            >
              Articles
            </a>
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#newsletter"
              className="hover:text-foreground transition-colors"
            >
              Newsletter
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Radar pulse animation */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div
            className="w-[600px] h-[600px] rounded-full border border-primary animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full border border-primary animate-ping"
            style={{ animationDuration: "3s", animationDelay: "1s" }}
          />
          <div
            className="absolute w-[200px] h-[200px] rounded-full border border-primary animate-ping"
            style={{ animationDuration: "3s", animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
            <Radar className="w-4 h-4" />
            Your Radar for LAN Parties
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              LAN Parties
            </span>{" "}
            Across Europe
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Track upcoming events. Read in-depth articles. Relive the best
            moments through recaps and reviews. By gamers, for gamers — no ads,
            no BS.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#events"
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Browse Events
            </a>
            <a
              href="#articles"
              className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
            >
              Read Articles
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Your Home Base for{" "}
            <span className="text-primary">LAN Culture</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Everything a LAN enthusiast needs in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Upcoming Events",
                desc: "A curated calendar of LAN parties across Europe and beyond. Never miss a date again.",
              },
              {
                icon: Newspaper,
                title: "In-Depth Articles",
                desc: "Stories about events, gaming culture, scene legends, and the art of the LAN.",
              },
              {
                icon: Camera,
                title: "Event Recaps",
                desc: "Post-event reviews with photos, highlights, and stories from the floor.",
              },
              {
                icon: Bell,
                title: "Ticket Alerts",
                desc: "Get notified the moment ticket sales open so you never miss your seat.",
              },
              {
                icon: Mail,
                title: "Newsletter",
                desc: "A weekly dose of LAN news, event announcements, and community picks.",
              },
              {
                icon: Heart,
                title: "Community First",
                desc: "No ads. No corporate fluff. Built by gamers who've slept under their desks at LANs.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <f.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section
        id="events"
        className="py-24 px-6 border-t border-border/50 bg-muted/30"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            🎮 Featured{" "}
            <span className="text-primary">Upcoming Events</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Real events. Real dates. Start planning your next adventure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <a
                key={event.name}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group block"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {event.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary/70" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary/70" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary/70" />
                    {event.attendance} expected
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section id="articles" className="py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            📝 Latest{" "}
            <span className="text-primary">Articles</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Deep dives into LAN culture, event recaps, and gaming stories.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.title}
                className="rounded-xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        id="newsletter"
        className="py-24 px-6 border-t border-border/50 bg-muted/30"
      >
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Stay in the{" "}
            <span className="text-primary">Loop</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Get a weekly roundup of upcoming LAN events, new articles, and
            community highlights. No spam — just good stuff for gamers.
          </p>
          <form
            className="flex gap-3 max-w-md mx-auto"
            action="#"
          >
            <input
              type="email"
              placeholder="your@email.gg"
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            Unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-primary" />
            <span>LAN Radar</span>
          </div>
          <span>© 2026 LAN Radar. GG WP.</span>
        </div>
      </footer>
    </div>
  );
}
