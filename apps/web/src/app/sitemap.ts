import type { MetadataRoute } from "next";

const siteUrl = "https://lanradar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/articles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
