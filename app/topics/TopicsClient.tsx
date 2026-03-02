"use client";

import { useSearchParams } from "next/navigation";

export default function TopicsClient() {
  const params = useSearchParams();
  const lang = params.get("lang");

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Topics</h1>
      <p className="text-gray-400 mb-6">
        Selected Language: {lang ?? "Not selected"}
      </p>

      <div className="bg-gray-900 p-6 rounded-xl">
        <ul className="space-y-3">
          <li>Arrays</li>
          <li>Strings</li>
          <li>Recursion</li>
          <li>Dynamic Programming</li>
          <li>Graphs</li>
        </ul>
      </div>
    </div>
  );
}