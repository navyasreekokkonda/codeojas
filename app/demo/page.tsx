"use client";

import { useState } from "react";

export default function DemoPage() {
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");
  const [problem, setProblem] = useState("");

  const generateProblem = () => {
    setProblem(
      `🧠 AI Generated Problem

Topic: ${topic}
Difficulty: ${difficulty}

Given an input array, write a function to solve a real-world problem related to ${topic}. Optimize your solution based on the difficulty level.`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-20">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-6">
          AI <span className="text-orange-500">Problem Generator</span>
        </h1>

        <p className="text-center text-gray-400">
          Select a topic and difficulty to generate a unique coding problem.
        </p>

        {/* Controls */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">

          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Topic
            </label>

            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-orange-500"
            >
              <option>Arrays</option>
              <option>Strings</option>
              <option>Trees</option>
              <option>Graphs</option>
              <option>Dynamic Programming</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-orange-500"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

        </div>

        {/* Button */}
        <div className="mt-10 text-center">
          <button
            onClick={generateProblem}
            className="
              px-8 py-3
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
            🚀 Generate Problem
          </button>
        </div>

        {/* Output */}
        {problem && (
          <div className="mt-12 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 text-gray-300 whitespace-pre-line hover:border-orange-500 transition">
            {problem}
          </div>
        )}

      </div>
    </main>
  );
}