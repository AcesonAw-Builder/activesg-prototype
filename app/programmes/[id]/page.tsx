export default function ProgrammeDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-4">
      <p className="text-text-secondary text-body">Programme {params.id} — coming soon</p>
    </main>
  );
}
