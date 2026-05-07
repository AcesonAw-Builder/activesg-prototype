export default function BallotResultPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-4">
      <p className="text-text-secondary text-body">Ballot result {params.id} — coming soon</p>
    </main>
  );
}
