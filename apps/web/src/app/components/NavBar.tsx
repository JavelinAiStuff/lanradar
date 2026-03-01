"use client";

import { useState } from "react";
import { Radar, ChevronDown } from "lucide-react";

const mainLinks = [
  { href: "/events", label: "Events" },
  { href: "/articles", label: "Articles" },
  { href: "/database", label: "Database" },
  { href: "/gallery", label: "Gallery" },
  { href: "/guides", label: "Guides" },
];

const toolLinks = [
  { href: "/timeline", label: "🕰️ Timeline" },
  { href: "/checklist", label: "✅ Checklist" },
  { href: "/compare", label: "⚖️ Compare" },
];

export default function NavBar({ active }: { active?: string }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-border/50 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Radar className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">LAN Radar</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-5 text-sm text-muted-foreground items-center">
          {mainLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hover:text-foreground transition-colors ${active === link.label.toLowerCase() ? "text-foreground font-medium" : ""}`}
            >
              {link.label}
            </a>
          ))}
          {/* Tools dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
              className={`flex items-center gap-1 hover:text-foreground transition-colors ${
                ["timeline", "checklist", "compare"].includes(active || "") ? "text-foreground font-medium" : ""
              }`}
            >
              Tools <ChevronDown className={`w-3 h-3 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute top-full right-0 mt-2 bg-card border border-border/50 rounded-lg py-1 min-w-[160px] shadow-xl">
                {toolLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border/50 px-6 py-4 space-y-3">
          {[...mainLinks, ...toolLinks].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block text-sm ${active === link.label.toLowerCase() ? "text-foreground font-medium" : "text-muted-foreground"} hover:text-foreground transition-colors`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
