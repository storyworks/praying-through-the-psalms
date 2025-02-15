import { useLoaderData } from "react-router-dom";
import { fetchPsalms } from "../utils/api-utils";

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

export async function loader({ params }: { params: { id: string } }) {
  try {
    const psalmsData = await fetchPsalms([`PSA.${params.id}`]);
    return { psalm: psalmsData[0] };
  } catch (error) {
    throw new Error(
      `Failed to load Psalm ${params.id}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export default function Psalm() {
  const { psalm } = useLoaderData() as { psalm: PsalmData };

  return (
    <main className="container mx-auto p-8">
      <article className="prose mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Psalm {psalm.data.content.chapter}
        </h1>
        <div className="space-y-2">
          {Object.entries(psalm.data.content.verses).map(([num, text]) => (
            <p key={num}>
              <span className="font-semibold">{num}</span> {text}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
