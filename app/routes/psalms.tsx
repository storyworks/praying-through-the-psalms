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
    console.log("Fetching psalms:", psalmIds); // Debug log

    const psalmsData = await Promise.all(
      psalmIds.map(async (id) => {
        try {
          return await fetchPsalm(id);
        } catch (error) {
          console.error(`Failed to fetch psalm ${id}:`, error);
          throw error;
        }
      })
    );

    if (!psalmsData || psalmsData.length === 0) {
      throw new Error("No psalms data returned");
    }

    return { psalms: psalmsData };
  } catch (error) {
    console.error("Loader error:", error);
    throw new Error(
      `Failed to load psalms: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
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
