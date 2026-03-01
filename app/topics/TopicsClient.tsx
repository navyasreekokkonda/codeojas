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

  const goToQuestion = (topic: string) => {
    router.push(`/question?lang=${lang}&topic=${topic}`);
  };

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        pt-24
        px-10
        relative
        z-10
        pointer-events-auto
      "
    >
      <h1 className="text-3xl font-bold mb-8">
        Choose a DSA Topic ({lang})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => goToQuestion(topic)}
            className="
              relative
              z-20
              pointer-events-auto
              bg-gray-900
              hover:bg-indigo-600
              transition
              p-6
              rounded-xl
              border border-gray-700
              text-left
              cursor-pointer
            "
          >
            <h3 className="text-lg font-semibold">{topic}</h3>
            <p className="text-sm text-gray-400">
              Practice {topic} problems
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
