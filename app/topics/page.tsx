"use client";

import { useRouter, useSearchParams } from "next/navigation";

const topics = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Recursion",
  "Binary Search",
  "Trees",
  "Graphs",
  "Dynamic Programming",
];

export default function TopicsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const lang = params.get("lang") || "Python";

  return (
    <div className="min-h-screen bg-black text-white px-10 py-12 relative z-10">
      <h1 className="text-3xl font-bold mb-8">
        Select a DSA Topic ({lang})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() =>
              router.push(
                `/question?lang=${encodeURIComponent(
                  lang
                )}&topic=${encodeURIComponent(topic)}`
              )
            }
            className="cursor-pointer text-left bg-gray-900 hover:bg-indigo-600 transition p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-xl font-semibold">{topic}</h3>
            <p className="text-gray-400 mt-2">
              Practice {topic} problems
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
