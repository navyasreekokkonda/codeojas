"use client";

import { useState } from "react";

export default function CompilerPage() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const language = "Python"; // later dynamic
  const problem =
    "Given an array of integers, find the maximum element in the array.";

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("⚠️ Please write code before submitting");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          problem,
          code,
        }),
      });

      const data = await res.json();

      setOutput(data.result);
      setHistory((prev) => [problem, ...prev]);
    } catch (err) {
      setError("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* HISTORY SIDEBAR */}
      <aside className="w-64 bg-gray-900 p-4 hidden md:block">
        <h3 className="text-lg font-semibold mb-4">🕒 History</h3>
        {history.length === 0 && (
          <p className="text-gray-400 text-sm">No submissions yet</p>
        )}
        <ul className="space-y-2 text-sm">
          {history.map((item, i) => (
            <li key={i} className="text-gray-300 truncate">
              • {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-400">
            CodeOjas Compiler
          </h1>
          <span className="bg-indigo-600 px-3 py-1 rounded text-sm">
            {language}
          </span>
        </div>

        {/* PROBLEM */}
        <div className="bg-gray-900 p-4 rounded-lg mb-4">
          <h2 className="font-semibold mb-2">📘 Problem</h2>
          <p className="text-gray-300">{problem}</p>
        </div>

        {/* ERROR BADGE */}
        {error && (
          <div className="bg-red-600/20 border border-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* CODE EDITOR */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Write your ${language} code here...`}
          className="w-full h-64 bg-gray-950 p-4 rounded-lg font-mono text-sm border border-gray-700 focus:outline-none"
        />

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-green-600 px-6 py-3 rounded-lg font-semibold"
        >
          {loading ? "Analyzing..." : "Submit Code"}
        </button>

        {/* AI OUTPUT */}
        {output && (
          <div className="mt-6 bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">🤖 AI Feedback</h3>
            <p className="text-gray-300 whitespace-pre-line">{output}</p>
          </div>
        )}
      </main>
    </div>
  );
}