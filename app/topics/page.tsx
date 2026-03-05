"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const topics = ["Arrays", "Strings", "Stacks", "Queues"];
const levels = ["Easy", "Medium", "Hard"];

export default function TopicsPage() {

  const searchParams = useSearchParams();
  const language = searchParams.get("lang") || "python";

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Select Topic ({language})
      </h1>

      {topics.map((topic) => (
        <div key={topic} className="mb-6">

          <h2 className="text-xl mb-2">{topic}</h2>

          <div className="flex gap-4">

            {levels.map((level) => (
              <Link
                key={level}
                href={`/question?topic=${topic}&level=${level}&lang=${language}`}
                className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
              >
                {level}
              </Link>
            ))}

          </div>

        </div>
      ))}

    </div>
  );
}