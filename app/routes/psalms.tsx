import { useLoaderData } from "react-router-dom";
import { getTodaysPsalms } from "../utils/date-utils";
import { fetchPsalm } from "../utils/api-utils";

interface PsalmData {
  data: {
    id: string;
    reference: string;
    content: string;
  };
}

export async function loader() {
  const API_KEY = process.env.BIBLE_API_KEY;

  if (!API_KEY) {
    throw new Error("Bible API key is not configured");
  }

  try {
    const psalmIds = getTodaysPsalms();
    console.log("Psalm IDs:", psalmIds); // Debug log

    const psalmsData = await Promise.all(psalmIds.map((id) => fetchPsalm(id)));
    return { psalms: psalmsData };
  } catch (error) {
    console.error("Loader error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to load psalms: ${message}`);
  }
}

export default function Psalms() {
  const { psalms } = useLoaderData() as { psalms: PsalmData[] };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Today's Psalms</h1>

      <div className="max-w-3xl mx-auto space-y-12">
        {psalms.map((psalm) => (
          <article key={psalm.data.id} className="prose mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              {psalm.data.reference}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: psalm.data.content }}
              className="leading-relaxed"
            />
          </article>
        ))}
      </div>
    </main>
  );
}
