export default function ProgrammeEnrolPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-4">
      <p className="text-text-secondary text-body">Enrol in {params.id} — coming soon</p>
    </main>
  );
}
