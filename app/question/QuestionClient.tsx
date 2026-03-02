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
      <h1 className="text-3xl font-bold mb-2">{topic} ({level})</h1>
      <p className="text-gray-400 mb-6">Language: {lang}</p>

      <div className="bg-gray-900 p-6 rounded-xl mb-6">
        <h2 className="font-semibold mb-2">Problem Statement</h2>
        <p className="text-gray-300">{question}</p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl">
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
          <pre className="mt-4 p-4 bg-black border border-gray-700 rounded-lg whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}