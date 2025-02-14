export async function fetchPsalm(id: string) {
  const API_KEY = process.env.BIBLE_API_KEY;
  const BIBLE_ID = "de4e12af7f28f599-02";

  const response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/chapters/${id}`,
    {
      headers: {
        "api-key": API_KEY ?? "", // Provide empty string as fallback
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch psalm");
  }

  return response.json();
}
