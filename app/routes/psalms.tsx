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
      subheading: string;
      title?: string;
      verses: Record<
        string,
        { text: string[]; space?: boolean; heading?: string }
      >;
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

  console.log("psalms", psalms);

  return (
    <main className="flex justify-center mx-auto p-8 mt-12 text-stone-900 dark:text-stone-100">
      {/* <h1 className="text-3xl font-bold  mb-8 text-center">
        Psalms for the {dayOfMonth}
        {getOrdinalSuffix(dayOfMonth)}
      </h1> */}

      {/* Add the psalm navigation buttons */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
        {psalms?.map((psalm) => (
          <button
            key={psalm.data.id}
            onClick={() => {
              document
                .querySelector(`#psalm-${psalm.data.content.chapter}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 flex items-center justify-center text-sm font-medium transition-colors"
          >
            {psalm.data.content.chapter}
          </button>
        ))}
      </nav>

      <div className="max-w-3xl mx-auto space-y-12">
        {psalms.map((psalm) => (
          <article
            key={psalm.data.id}
            id={`psalm-${psalm.data.content.chapter}`}
            className="prose mx-auto scroll-mt-16"
          >
            <h2 className="text-2xl font-semibold">
              Psalm {psalm.data.content.chapter}
            </h2>
            <h3 className="text-lg font-semibold italic text-stone-500">
              {psalm.data.content.subheading}
            </h3>
            {/* {psalm.data.content.title && (
              <h4 className="text-md italic">{psalm.data.content.title}</h4>
            )} */}
            <div>
              {Object.entries(psalm.data.content.verses).map(([num, verse]) => (
                <>
                  {verse.heading && (
                    <h5 className="font-bold mt-6  text-stone-400">
                      {verse.heading}
                    </h5>
                  )}
                  <p
                    key={num}
                    className={`relative${
                      verse.space ? " mt-4" : ""
                    } text-verse-size`}
                  >
                    <span className="absolute -left-6 text-xs text-stone-400 text-right w-5 top-[3px]">
                      {num}{" "}
                    </span>
                    {verse.text[0]}
                    {verse.text.slice(1).map((line, i) => (
                      <>
                        <br />
                        <span className="pl-4">{line}</span>
                      </>
                    ))}
                  </p>
                </>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
