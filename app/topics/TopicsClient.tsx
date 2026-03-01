"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const params = useSearchParams();

  const lang = params.get("lang") ?? "Python";

  const handleClick = (topic: string) => {
    router.push(
      `/question?lang=${encodeURIComponent(lang)}&topic=${encodeURIComponent(topic)}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Select a DSA Topic ({lang})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => handleClick(topic)}
            className="
              bg-gray-900
              hover:bg-indigo-600
              cursor-pointer
              transition
              p-6
              rounded-xl
              text-left
              border border-gray-700
            "
          >
            <h3 className="text-lg font-semibold">{topic}</h3>
            <p className="text-sm text-gray-400 mt-1">
              Practice {topic} problems
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
