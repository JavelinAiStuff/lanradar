import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAN Radar - Find LAN Parties Near You",
  description: "Your radar for LAN parties, events, and gaming gatherings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
