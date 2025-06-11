export default async function AboutPage() {
  await new Promise((r) => setTimeout(r, 0));

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">About BikeShare</h1>
      <p className="mt-4 text-gray-600">More information will be available soon.</p>
    </main>
  );
}
