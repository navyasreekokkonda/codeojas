"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const topics = [
  "Arrays",
  "Strings",
  "Recursion",
  "Dynamic Programming",
  "Graphs",
  "Trees",
];

export default function TopicsClient() {
  const params = useSearchParams();
  const lang = params.get("lang") || "python";

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden p-10">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-6 text-center">
          Explore <span className="text-orange-500">Topics</span>
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Selected Language:{" "}
          <span className="text-orange-400 font-semibold">{lang}</span>
        </p>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {topics.map((topic) => (
            <Link
              key={topic}
              href={`/topics?topic=${topic}&lang=${lang}`}
              className="
              backdrop-blur-lg
              bg-white/5
              border border-white/10
              p-8
              rounded-2xl
              text-center
              text-lg font-semibold
              hover:border-orange-500
              hover:scale-105
              transition
              "
            >
              {topic}
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}