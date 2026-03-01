"use client";

import { useSearchParams, useRouter } from "next/navigation";

const TOPICS = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stacks",
  "Queues",
  "Trees",
  "Graphs",
  "Dynamic Programming",
];

export default function TopicsClient() {
  const params = useSearchParams();
  const router = useRouter();

  const lang = params.get("lang") ?? "Python";

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Choose a DSA Topic ({lang})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() =>
              router.push(
                `/question?lang=${encodeURIComponent(lang)}&topic=${encodeURIComponent(topic)}`
              )
            }
            className="bg-gray-900 hover:bg-indigo-600 transition p-6 rounded-xl text-left"
          >
            <h3 className="text-lg font-semibold">{topic}</h3>
            <p className="text-gray-400 text-sm mt-1">
              Practice {topic} problems
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
