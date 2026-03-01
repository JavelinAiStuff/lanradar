import { Radar } from "lucide-react";
import { articles } from "../data/articles";
import ArticlesClient from "../components/ArticlesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "In-depth articles about LAN culture, event recaps, gaming guides, and community stories.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/50 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Radar className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">LAN Radar</span>
          </a>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="/events" className="hover:text-foreground transition-colors">Events</a>
            <a href="/articles" className="text-foreground font-medium">Articles</a>
            <a href="/#newsletter" className="hover:text-foreground transition-colors">Newsletter</a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            📝 <span className="text-primary">Articles</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            Deep dives into LAN culture, event recaps, guides, and gaming stories from the community.
          </p>

          <ArticlesClient articles={articles} />
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articles.map((a) => ({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              author: { "@type": "Person", name: a.author },
              datePublished: a.dateISO,
              image: a.image,
              description: a.excerpt,
            }))
          ),
        }}
      />
    </div>
  );
}
