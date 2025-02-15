import { JSDOM } from "jsdom";

function parseNLTResponse(htmlContent: string) {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  // Get all psalm containers
  const passages = doc.querySelectorAll("section");

  return Array.from(passages).map((passage) => {
    const verses: { [key: string]: string } = {};

    // Get all verse containers within this psalm
    const verseExports = passage.querySelectorAll("verse_export");

    const chapter = verseExports[0]?.getAttribute("ch");
    console.log("chapter", chapter);

    verseExports.forEach((verseExport) => {
      const verseNumber = verseExport.getAttribute("vn");
      if (!verseNumber) return;

      const lines = Array.from(
        verseExport.querySelectorAll(
          ".poet1,.poet1-vn, .poet1-vn-sp, .poet2, .poet1-vn-hd"
        )
      )
        .map((line) => {
          // Remove .tn elements before getting text
          line.querySelectorAll(".tn, .a-tn").forEach((tn) => tn.remove());
          return line.textContent?.replace(/^\d+/, "").trim();
        })
        .filter(Boolean);

      verses[+verseNumber] = lines.join(" ");
    });

    return { chapter, verses };
  });
}

export async function fetchPsalms(ids: string[]) {
  const API_KEY = process.env.NLT_API_KEY;
  if (!API_KEY) {
    throw new Error("NLT API key not configured");
  }

  const psalmRefs = ids.map((id) => id).join(",");

  try {
    const response = await fetch(
      `https://api.nlt.to/api/passages?key=${API_KEY}&ref=${psalmRefs}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`API returned ${response.status}`);
    }

    const htmlContent = await response.text();
    const versesArray = parseNLTResponse(htmlContent);

    console.log("versesArray", versesArray);

    return ids.map((id, index) => ({
      data: {
        id: id,
        content: versesArray[index] || {},
      },
    }));
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
