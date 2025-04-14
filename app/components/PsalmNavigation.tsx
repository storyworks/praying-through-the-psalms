import type { PsalmData } from "~/routes/psalms";

interface PsalmNavigationProps {
  psalms: PsalmData[];
  activeChapter?: number;
}

export function PsalmNavigation({
  psalms,
  activeChapter,
}: PsalmNavigationProps) {
  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
      {psalms.map((psalm) => (
        <button
          key={psalm.data.id}
          onClick={() => {
            document
              .querySelector(`#psalm-${psalm.data.content.chapter}`)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
            ${
              activeChapter === +psalm.data.content.chapter
                ? "bg-stone-400 dark:bg-stone-600 text-white shadow-lg scale-110"
                : "bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700"
            }
          `}
        >
          {psalm.data.content.chapter}
        </button>
      ))}
    </nav>
  );
}
