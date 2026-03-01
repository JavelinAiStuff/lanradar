"use client";

import { useState } from "react";
import type { Article } from "../data/articles";
import { articleCategories } from "../data/articles";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<string>("All");

  const filtered =
    category === "All"
      ? articles
      : articles.filter((a) => a.category === category);

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a !== featured);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {articleCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
          >
            <Badge
              variant={category === cat ? "default" : "outline"}
              className="px-4 py-2 text-sm cursor-pointer uppercase tracking-wider"
            >
              {cat}
            </Badge>
          </button>
        ))}
      </div>

      {/* Featured article */}
      {featured && (
        <GlowContainer hover intensity="lg" className="mb-12 p-0 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center relative">
              <HUDCornerFrame position="top-right" size={40} />
              <HUDCornerFrame position="bottom-left" size={40} />
              <Badge variant="secondary" className="w-fit mb-4 text-[10px] uppercase tracking-widest">
                {featured.category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wide font-display">
                {featured.title}
              </h2>
              <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono tracking-wider uppercase">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </div>
        </GlowContainer>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((article) => (
          <Card
            key={article.slug}
            className="p-0 overflow-hidden group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-[10px] uppercase tracking-widest">
                  {article.category}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  {article.readTime}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors uppercase tracking-wide">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono tracking-wider">
                <span>{article.author}</span>
                <span>{article.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
