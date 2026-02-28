import { Radar, Wifi, Users, MapPin, Gamepad2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border/50 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radar className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">LAN Radar</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#" className="hover:text-foreground transition-colors">Events</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Radar pulse animation */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[600px] h-[600px] rounded-full border border-primary animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-primary animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-primary animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
            <Wifi className="w-4 h-4" />
            Now Scanning Your Area
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              LAN Party
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Discover local gaming events, connect with players in your area, and never miss a LAN party again. Your radar for everything multiplayer.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
              Scan Nearby Events
            </button>
            <button className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors">
              Host a LAN
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Everything You Need to{" "}
            <span className="text-primary">Lock In</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Local Discovery",
                desc: "Find LAN events happening near you with our location-based radar.",
              },
              {
                icon: Users,
                title: "Squad Up",
                desc: "Connect with local gamers, form teams, and join events together.",
              },
              {
                icon: Gamepad2,
                title: "All Games",
                desc: "From CS2 to Smash Bros — filter events by your favorite games.",
              },
              {
                icon: Zap,
                title: "Instant RSVP",
                desc: "One click to join. Get notified when spots open up.",
              },
              {
                icon: Radar,
                title: "Real-Time Updates",
                desc: "Live player counts, seat availability, and event status.",
              },
              {
                icon: Wifi,
                title: "Network Ready",
                desc: "Pre-event network configs, game server info, and setup guides.",
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
