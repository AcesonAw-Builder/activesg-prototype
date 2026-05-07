export default function VenueBookingPage({ params }: { params: { venueId: string } }) {
  return (
    <main className="p-4">
      <p className="text-text-secondary text-body">Venue {params.venueId} slots — coming soon</p>
    </main>
  );
}
