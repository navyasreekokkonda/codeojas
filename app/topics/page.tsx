"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const topics = [
  "Arrays",
  "Strings",
  "Stacks",
  "Queues",
  "Trees",
  "Graphs",
  "Dynamic Programming",
];

const levels = ["Easy", "Medium", "Hard"];

function TopicsContent() {
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") || "python";

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden p-10">

      {/* Background Glow (soft, not affecting buttons) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 opacity-10 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-12 text-center">
          Choose <span className="text-orange-500">Topic</span>
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Selected Language:{" "}
          <span className="text-orange-400 font-semibold">{language}</span>
        </p>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {topics.map((topic) => (
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
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                {topic}
              </h2>

              <div className="flex gap-4 flex-wrap">

                {levels.map((level) => (
                  <Link
                    key={level}
                    href={`/question?topic=${topic}&level=${level}&lang=${language}`}
                    className="
                    px-5
                    py-2
                    rounded-lg
                    text-sm
                    font-semibold
                    bg-orange-500
                    text-white
                    border border-orange-400/20
                    hover:bg-orange-600
                    transition
                    shadow-none
                    "
                  >
                    {level}
                  </Link>
                ))}

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default function TopicsPage() {
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