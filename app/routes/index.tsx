export default function Index() {
  return (
    <main className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Daily Psalms</h1>

        <p className="mb-8 text-lg">
          Pray through the Psalms with a selection of five chapters each day and
          Psalm 119 on the 31st day of the month
        </p>

        <a
          href="/psalms"
          className="inline-block text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-amber-900 hover:to-amber-800 transition-colors bg-gradient-to-r from-amber-800 to-amber-700"
        >
          Read Today's Psalms
        </a>
      </div>
    </main>
  );
}
