"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuestionClient() {
  const params = useSearchParams();

  const lang = params.get("lang") || "Python";
  const topic = params.get("topic") || "Arrays";
  const level = params.get("level") || "Easy";

  const [question, setQuestion] = useState("Loading question...");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(`/api/generate?topic=${topic}&level=${level}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data.question))
      .catch(() => setQuestion("Failed to load question"));
  }, [topic, level]);

  const handleSubmit = () => {
    if (!code.trim()) {
      setResult("❌ Please write code before submitting.");
      return;
    }

    setResult("⏳ AI is analyzing your solution...");

    setTimeout(() => {
      if (
        code.includes("print") ||
        code.includes("console.log") ||
        code.includes("return")
      ) {
        setResult("✅ Correct logic detected! Try the next level 🚀");
      } else {
        setResult(
          "❌ Error detected:\nYou did not output the result.\n\n✅ Fix:\nprint(result)"
        );
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">
        {topic} ({level})
      </h1>
      <p className="text-gray-400 mb-6">Language: {lang}</p>

      {/* LEFT RIGHT LAYOUT */}
      <div className="flex gap-6">

        {/* LEFT SIDE — QUESTION */}
        <div className="w-1/2 bg-gray-900 p-6 rounded-xl">
          <h2 className="font-semibold mb-4 text-lg">Problem Statement</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{question}</p>
        </div>

        {/* RIGHT SIDE — COMPILER */}
        <div className="w-1/2 bg-gray-900 p-6 rounded-xl">

          <h2 className="font-semibold mb-4 text-lg">Compiler</h2>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Write your ${lang} code here...`}
            className="w-full h-64 bg-black text-white p-4 rounded-lg border border-gray-700"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
          >
            Submit Code
          </button>

          {result && (
            <pre className="mt-4 p-4 bg-black border border-gray-700 rounded-lg whitespace-pre-wrap">
              {result}
            </pre>
          )}

        </div>

      </div>

    </div>
  );
}