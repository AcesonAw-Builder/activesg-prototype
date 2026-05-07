export default function QRPassPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-4">
      <p className="text-text-secondary text-body">QR for {params.id} — coming soon</p>
    </main>
  );
}
