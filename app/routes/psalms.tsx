import { useLoaderData, useSearchParams } from "react-router-dom";
import { getOrdinalSuffix, getTodaysPsalms } from "../utils/date-utils";
import { fetchPsalms } from "../utils/api-utils";
import { useEffect } from "react";

interface PsalmData {
  data: {
    id: string;
    reference: string;
    content: {
      chapter: number;
      verses: Record<string, string>;
    };
  };
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const clientDate =
    url.searchParams.get("date") || new Date().getDate().toString();

  try {
    const psalmIds = getTodaysPsalms(parseInt(clientDate));
    const psalmsData = await fetchPsalms(psalmIds);
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
  const [searchParams, setSearchParams] = useSearchParams();
  const dayOfMonth = new Date().getDate();

  useEffect(() => {
    setSearchParams({ date: dayOfMonth.toString() });
  }, [setSearchParams]);

  const { psalms } = useLoaderData() as { psalms: PsalmData[] };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Psalms for the {dayOfMonth}
        {getOrdinalSuffix(dayOfMonth)}
      </h1>

      <div className="max-w-3xl mx-auto space-y-12">
        {psalms.map((psalm) => (
          <article key={psalm.data.id} className="prose mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Psalm {psalm.data.content.chapter}
            </h2>
            <div className="space-y-2">
              {Object.entries(psalm.data.content.verses).map(([num, text]) => (
                <p key={num}>
                  <span className="font-semibold">{num}</span> {text}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
