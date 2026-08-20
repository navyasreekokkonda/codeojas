"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const allTopics = [
  "Arrays",
  "Strings",
  "Recursion",
  "Dynamic Programming",
  "Graphs",
  "Trees",
  "Stacks",
  "Queues",
  "Linked Lists",
  "Sorting",
  "Searching",
  "Heaps",
  "Hashing",
];

const levels = ["Easy", "Medium", "Hard"];

function TopicsContent() {
  const params = useSearchParams();
  const lang = params.get("lang") || "python";
  const [searchQuery, setSearchQuery] = useState("");

  // Prevent global window shortcuts from capturing Backspace inside active input fields
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable);

      if (isInput && (e.key === "Backspace" || e.key === "Delete")) {
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  const filteredTopics = allTopics.filter((topic) =>
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden p-10 select-auto">
      {/* Background Glow - pointer-events-none prevents blocking user interaction */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-6 text-center">
          Explore <span className="text-orange-500">Topics</span>
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Selected Language:{" "}
          <span className="text-orange-400 font-semibold">{lang}</span>
        </p>

        {/* Search Input Filter */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
          />
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <div
                key={topic}
                className="
                backdrop-blur-lg
                bg-white/5
                border border-white/10
                p-6
                rounded-2xl
                hover:border-orange-500
                transition
                "
              >
                <h2 className="text-xl font-semibold mb-4 text-orange-400 text-center">
                  {topic}
                </h2>

                <div className="flex justify-center gap-2 flex-wrap">
                  {levels.map((level) => (
                    <Link
                      key={level}
                      href={`/question?topic=${encodeURIComponent(
                        topic
                      )}&level=${level}&lang=${lang}`}
                      className="
                      px-4
                      py-2
                      rounded-lg
                      text-xs
                      font-semibold
                      bg-orange-500
                      text-white
                      border border-orange-400/20
                      hover:bg-orange-600
                      transition
                      "
                    >
                      {level}
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-10">
              No topics matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TopicsClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          🤖 Loading Topics...
        </div>
      }
    >
      <TopicsContent />
    </Suspense>
  );
}