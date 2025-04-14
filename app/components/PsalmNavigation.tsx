import type { PsalmData } from "~/routes/psalms";
import { useEffect, useState, useRef } from "react";

interface PsalmNavigationProps {
  psalms: PsalmData[];
}

export function PsalmNavigation({ psalms }: PsalmNavigationProps) {
  const [activeChapter, setActiveChapter] = useState<number>();
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Handle user interaction with a single event listener
  useEffect(() => {
    const showNavigation = () => {
      setIsVisible(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      // Set a timeout to hide the navigation after inactivity
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    };

    // Use a single event listener for all interaction types
    const handleInteraction = (event: Event) => {
      // Only show navigation for specific event types
      if (
        event.type === "scroll" ||
        event.type === "touchstart" ||
        event.type === "mousemove"
      ) {
        showNavigation();
      }
    };

    // Add a single event listener to the document
    document.addEventListener("scroll", handleInteraction, { passive: true });
    document.addEventListener("touchstart", handleInteraction, {
      passive: true,
    });
    document.addEventListener("mousemove", handleInteraction, {
      passive: true,
    });

    return () => {
      document.removeEventListener("scroll", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("mousemove", handleInteraction);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Intersection Observer for active chapter
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chapter = parseInt(entry.target.id.replace("psalm-", ""));
            setActiveChapter(chapter);
          }
        });
      },
      {
        threshold: isMobile ? 0.1 : 0.3,
        rootMargin: isMobile ? "-50px 0px" : "-100px 0px",
      }
    );

    const psalmElements = document.querySelectorAll('[id^="psalm-"]');
    psalmElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40 transition-all duration-700 ease-in-out
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}
      `}
    >
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
