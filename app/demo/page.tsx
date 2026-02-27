"use client";

import { useState } from "react";

export default function DemoPage() {
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");
  const [problem, setProblem] = useState("");

  const generateProblem = () => {
    setProblem(
      `🧠 AI Generated Problem\n\nTopic: ${topic}\nDifficulty: ${difficulty}\n\nGiven an input array, write a function to solve a real-world problem related to ${topic}. Optimize your solution based on the difficulty level.`
    );
  };

  return (
    <main className="min-h-screen px-8 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        AI Problem Generator
      </h1>

      <p className="text-center text-gray-600 mt-4">
        Select a topic and difficulty to generate a unique coding problem.
      </p>

      {/* Controls */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2">
            Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>Arrays</option>
            <option>Strings</option>
            <option>Trees</option>
            <option>Graphs</option>
            <option>Dynamic Programming</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 text-center">
        <button
          onClick={generateProblem}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Generate Problem
        </button>
      </div>

      {/* Output */}
      {problem && (
        <div className="mt-12 p-6 border rounded-xl bg-gray-50 whitespace-pre-line">
          {problem}
        </div>
      )}
    </main>
  );
}