import { events, countries } from "../data/events";
import EventsClient from "../components/EventsClient";
import NavBar from "../components/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming LAN parties and gaming events across Europe and beyond.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar active="events" />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            🎮 LAN <span className="text-primary">Events</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            Your complete calendar of LAN parties, gaming festivals, and community events. Find your next adventure.
          </p>

          <EventsClient events={events} countries={countries} />
        </div>
      </div>

      {/* JSON-LD for events */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            events.map((e) => ({
              "@context": "https://schema.org",
              "@type": "Event",
              name: e.name,
              startDate: e.startDate,
              endDate: e.endDate,
              location: {
                "@type": "Place",
                name: e.location,
                address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: e.countryCode },
              },
              url: e.url,
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            }))
          ),
        }}
      />
    </div>
  );
}
