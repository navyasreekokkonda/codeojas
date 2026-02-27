"use client";

import { useRouter, useSearchParams } from "next/navigation";

const topics = ["Arrays", "Strings", "Linked List", "Stack", "Queue", "Trees"];

export default function TopicsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const lang = params.get("lang");

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h2 className="text-3xl font-bold mb-6">
        Select DSA Topic ({lang})
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() =>
              router.push(`/question?lang=${lang}&topic=${topic}`)
            }
            className="p-6 bg-gray-900 border border-gray-700 rounded-xl hover:border-indigo-500"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}