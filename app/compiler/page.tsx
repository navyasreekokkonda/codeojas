"use client";

import { useState } from "react";

export default function CompilerPage() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const language = "Python";
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
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px]"></div>

      {/* HISTORY SIDEBAR */}
      <aside className="w-64 bg-black/60 backdrop-blur-lg border-r border-white/10 p-5 hidden md:block relative z-10">
        <h3 className="text-lg font-semibold mb-4 text-orange-400">
          🕒 History
        </h3>

        {history.length === 0 && (
          <p className="text-gray-500 text-sm">No submissions yet</p>
        )}

        <ul className="space-y-2 text-sm">
          {history.map((item, i) => (
            <li
              key={i}
              className="text-gray-300 truncate hover:text-orange-400 transition"
            >
              • {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 relative z-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-orange-500">CodeOjas</span> Compiler
          </h1>

          <span className="bg-orange-500/20 border border-orange-500 text-orange-400 px-3 py-1 rounded-lg text-sm">
            {language}
          </span>
        </div>

        {/* PROBLEM */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-5 rounded-2xl mb-6 hover:border-orange-500 transition">
          <h2 className="font-semibold mb-2 text-orange-400">
            📘 Problem
          </h2>
          <p className="text-gray-300">{problem}</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 p-3 rounded mb-5">
            {error}
          </div>
        )}

        {/* CODE EDITOR */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Write your ${language} code here...`}
          className="w-full h-72 bg-black border border-white/10 p-4 rounded-xl font-mono text-sm text-gray-200 focus:outline-none focus:border-orange-500 transition"
        />

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
          mt-6
          px-8
          py-3
          rounded-xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-orange-500
          via-orange-400
          to-yellow-500
          bg-[length:200%_200%]
          animate-[gradientMove_4s_ease_infinite]
          shadow-lg shadow-orange-500/30
          hover:scale-105
          transition
          "
        >
          {loading ? "Analyzing..." : "🚀 Submit Code"}
        </button>

        {/* AI OUTPUT */}
        {output && (
          <div className="mt-8 backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-orange-500 transition">
            <h3 className="font-semibold mb-3 text-orange-400">
              🤖 AI Feedback
            </h3>

            <p className="text-gray-300 whitespace-pre-line">
              {output}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}