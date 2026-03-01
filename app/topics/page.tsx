"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TopicsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const lang = params.get("lang");

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const topics = ["Arrays", "Strings", "Linked List"];

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl mb-6">Choose Topic & Level</h1>

      {topics.map((topic) => (
        <div key={topic} className="mb-6">
          <h2 className="text-xl mb-2">{topic}</h2>
          <div className="flex gap-4">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() =>
                  router.push(
                    `/question?lang=${lang}&topic=${topic}&level=${level}`
                  )
                }
                className="px-4 py-2 bg-indigo-600 rounded"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}