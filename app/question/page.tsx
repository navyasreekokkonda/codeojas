"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function QuestionPage() {
  const params = useSearchParams();
  const language = params.get("lang") || "Java";
  const topic = params.get("topic") || "Arrays";
  const level = params.get("level") || "Beginner";

  const [question, setQuestion] = useState<any>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function generateQuestion() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        topic,
        level,
        nonce: Date.now() + Math.random(),
      }),
    });

    const data = await res.json();
    setQuestion(data);
    setLoading(false);
  }

  async function submitCode() {
    setResult({ status: "loading", explanation: "⏳ Analyzing code..." });

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        problem: question.problem,
        code,
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-2">
        {topic} ({level})
      </h1>
      <p className="text-gray-400 mb-6">Language: {language}</p>

      <button
        onClick={generateQuestion}
        className="mb-6 px-6 py-2 bg-indigo-600 rounded"
      >
        Generate New Problem
      </button>

      {loading && <p>Generating unique problem...</p>}

      {question && (
        <div className="bg-gray-900 p-6 rounded mb-6">
          <h2 className="text-xl font-semibold">{question.title}</h2>
          <p className="mt-3">{question.problem}</p>
          <p className="mt-2 text-gray-400">Input: {question.input}</p>
          <p className="text-gray-400">Output: {question.output}</p>
          <p className="text-gray-500 mt-2">
            Constraints: {question.constraints}
          </p>
        </div>
      )}

      {question && (
        <>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Write your ${language} code here...`}
            className="w-full h-48 bg-black border border-gray-700 p-4 rounded"
          />

          <button
            onClick={submitCode}
            className="mt-4 px-6 py-2 bg-green-600 rounded"
          >
            Submit Code
          </button>
        </>
      )}

      {result && result.status !== "loading" && (
        <div className="mt-6 bg-gray-900 p-6 rounded">
          <h3 className="font-semibold mb-2">
            {result.status === "correct"
              ? "✅ Correct Solution"
              : "❌ Issues Found"}
          </h3>
          <p className="mb-4">{result.explanation}</p>

          {result.corrected_code && (
            <pre className="bg-black p-4 rounded overflow-x-auto">
              {result.corrected_code}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}