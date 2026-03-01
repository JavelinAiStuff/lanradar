import type { Metadata } from "next";
import { Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import { GTMScript, GTMNoscript } from "./components/GTMScript";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const siteUrl = "https://lanradar.com";

export const metadata: Metadata = {
  title: {
    default: "LAN Radar - Discover LAN Parties Across Europe",
    template: "%s | LAN Radar",
  },
  description:
    "Your radar for LAN parties, gaming events, and LAN culture. Find upcoming events, read in-depth articles, and join the community. By gamers, for gamers.",
  keywords: [
    "LAN party",
    "LAN events",
    "gaming events",
    "DreamHack",
    "Assembly",
    "Gamescom",
    "LAN culture",
    "gaming festival",
    "esports",
    "LAN party finder",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "LAN Radar",
    title: "LAN Radar - Discover LAN Parties Across Europe",
    description:
      "Your radar for LAN parties, gaming events, and LAN culture. Find upcoming events, read articles, and join the community.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LAN Radar - Discover LAN Parties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAN Radar - Discover LAN Parties Across Europe",
    description:
      "Your radar for LAN parties, gaming events, and LAN culture. Find upcoming events, read articles, and join the community.",
    images: ["/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LAN Radar",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Your radar for LAN parties, gaming events, and LAN culture across Europe.",
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${orbitron.variable}`}>
      <head>
        <GTMScript />
      </head>
      <body className="font-sans antialiased">
        <GTMNoscript />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
