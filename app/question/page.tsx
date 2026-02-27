"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function QuestionPage() {
  const params = useSearchParams();
  const lang = params.get("lang");
  const topic = params.get("topic");

  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    setResult("⏳ AI is analyzing your solution...");
    // AI logic comes here later
    setTimeout(() => {
      setResult("✅ Good attempt! Review edge cases and try again.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-4">{topic} Problem</h1>
      <p className="text-gray-400 mb-6">Language: {lang}</p>

      <div className="bg-gray-900 p-6 rounded-xl mb-8">
        <h3 className="font-semibold mb-2">Problem Statement</h3>
        <p className="text-gray-300">
          Write a program to solve the given problem efficiently.
        </p>
      </div>

      {/* COMPILER */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Compiler ({lang})</span>
          <span className="text-sm text-gray-400">Auto language-based</span>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Write your ${lang} code here...`}
          className="w-full h-48 bg-black text-white p-4 rounded-lg border border-gray-700"
        />

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-indigo-600 rounded-lg"
        >
          Submit Code
        </button>

        {result && (
          <div className="mt-4 p-4 bg-black border border-gray-700 rounded-lg">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}