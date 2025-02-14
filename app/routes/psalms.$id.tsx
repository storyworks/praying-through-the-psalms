import { useLoaderData } from "react-router";
import { fetchPsalm } from "../utils/api-utils";
import type { Params } from "react-router";

interface PsalmData {
  data: {
    id: string;
    reference: string;
    content: string;
  };
}

export const loader = async ({ params }: { params: Params<"id"> }) => {
  try {
    const psalm = await fetchPsalm(`PSA.${params.id}`);
    return { psalm };
  } catch (error) {
    throw new Error(`Failed to load Psalm ${params.id}`);
  }
};

export default function Psalm() {
  const { psalm } = useLoaderData() as { psalm: PsalmData };

  return (
    <main className="container mx-auto p-8">
      <article className="prose mx-auto">
        <h1 className="text-3xl font-bold mb-8">{psalm.data.reference}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: psalm.data.content }}
          className="leading-relaxed"
        />
      </article>
    </main>
  );
}
