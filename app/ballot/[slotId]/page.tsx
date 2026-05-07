export default function BallotEntryPage({ params }: { params: { slotId: string } }) {
  return (
    <main className="p-4">
      <p className="text-text-secondary text-body">Ballot for {params.slotId} — coming soon</p>
    </main>
  );
}
