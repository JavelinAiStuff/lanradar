"use client";

import { useState } from "react";
import type { Article } from "../data/articles";
import { articleCategories } from "../data/articles";

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
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-panel border border-border/50 glow-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured article */}
      {featured && (
        <div className="mb-12 rounded-xl overflow-hidden bg-panel border border-border/50 glow-border hover:border-primary/30 transition-colors group cursor-pointer">
          <div className="md:flex">
            <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary w-fit mb-4">
                {featured.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((article) => (
          <div
            key={article.slug}
            className="rounded-xl bg-panel border border-border/50 glow-border overflow-hidden hover:border-primary/30 transition-colors group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {article.readTime}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
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
    </div>
  );
}
