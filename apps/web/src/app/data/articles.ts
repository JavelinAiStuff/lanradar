export interface Article {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  dateISO: string;
  category: "Reviews" | "Guides" | "Culture" | "News";
  readTime: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    slug: "what-makes-a-great-lan-party",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
    title: "What Makes a Great LAN Party? The Definitive Guide",
    excerpt:
      "From the network setup to the snack table — we break down what separates a legendary LAN from a laggy mess. After attending over 50 events, here's everything we've learned about what makes gamers come back year after year.",
    author: "LAN Radar Team",
    date: "Feb 20, 2026",
    dateISO: "2026-02-20",
    category: "Guides",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "dreamhack-summer-2025-recap",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop",
    title: "DreamHack Summer 2025: A Recap",
    excerpt:
      "60,000 gamers, three days of nonstop gaming, and memories for a lifetime. Here's what went down in Stockholm — from the epic CS2 finals to the legendary after-party.",
    author: "Alex R.",
    date: "Feb 12, 2026",
    dateISO: "2026-02-12",
    category: "Reviews",
    readTime: "6 min read",
  },
  {
    slug: "rise-of-community-lans",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=500&fit=crop",
    title: "The Rise of Community LANs",
    excerpt:
      "Forget the mega-events. Small community LANs are making a massive comeback across Europe — and here's why grassroots gaming gatherings are more important than ever.",
    author: "Sam K.",
    date: "Jan 28, 2026",
    dateISO: "2026-01-28",
    category: "Culture",
    readTime: "5 min read",
  },
  {
    slug: "ultimate-lan-bag-packing-list",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=500&fit=crop",
    title: "The Ultimate LAN Bag Packing List for 2026",
    excerpt:
      "Don't be that person who forgot their ethernet cable. From monitors to snacks, here's the complete checklist for surviving a 72-hour LAN party without losing your mind.",
    author: "Tom B.",
    date: "Jan 15, 2026",
    dateISO: "2026-01-15",
    category: "Guides",
    readTime: "4 min read",
  },
  {
    slug: "assembly-summer-history",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=500&fit=crop",
    title: "Assembly: The Finnish LAN That Changed Gaming Forever",
    excerpt:
      "From a 200-person gathering in 1992 to one of the world's most iconic demo parties — the story of Assembly and how Finland became the spiritual home of LAN culture.",
    author: "Mika L.",
    date: "Dec 20, 2025",
    dateISO: "2025-12-20",
    category: "Culture",
    readTime: "10 min read",
  },
  {
    slug: "best-lan-games-2026",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=800&h=500&fit=crop",
    title: "Top 10 Games to Play at a LAN Party in 2026",
    excerpt:
      "CS2 is a given, but what else should be on your playlist? From new releases to timeless classics, these are the games that guarantee a good time at any LAN event.",
    author: "LAN Radar Team",
    date: "Dec 5, 2025",
    dateISO: "2025-12-05",
    category: "News",
    readTime: "7 min read",
  },
  {
    slug: "insomnia-gaming-festival-review",
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=500&fit=crop",
    title: "Insomnia i72 Review: UK's Biggest LAN Keeps Getting Better",
    excerpt:
      "Insomnia Gaming Festival continues to prove why it's the crown jewel of UK LAN events. Here's our full review of i72 — the good, the bad, and the gloriously chaotic.",
    author: "James W.",
    date: "Nov 18, 2025",
    dateISO: "2025-11-18",
    category: "Reviews",
    readTime: "6 min read",
  },
];

export const articleCategories = ["All", "Reviews", "Guides", "Culture", "News"] as const;
