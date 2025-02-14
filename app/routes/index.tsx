export default function Index() {
  return (
    <main className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Daily Psalms</h1>

        <p className="mb-8 text-lg">
          Read through the Psalms with a curated selection of five chapters each
          day.
        </p>

        <a
          href="/psalms"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Read Today's Psalms
        </a>
      </div>
    </main>
  );
}
