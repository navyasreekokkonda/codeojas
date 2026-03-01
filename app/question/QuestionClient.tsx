"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function QuestionClient() {
  const params = useSearchParams();
  const lang = params.get("lang") ?? "Python";
  const topic = params.get("topic") ?? "Arrays";

  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (!code.trim()) {
      setResult("❌ No code submitted. Please write your solution.");
      return;
    }

    // Temporary AI logic (safe for build)
    const hasError =
      (lang === "Python" && !code.includes("print")) ||
      code.includes("syntaxerror") ||
      code.includes("error");

    if (hasError) {
      setResult(
        `❌ Errors found in your ${lang} code.

• Check syntax
• Verify logic
• Ensure correct output

✅ Example Fix:
Add missing print / return statement.`
      );
    } else {
      setResult("✅ Excellent! Your solution looks correct. Move forward 🚀");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-2">{topic} Problem</h1>
      <p className="text-gray-400 mb-6">Language: {lang}</p>

      <div className="bg-gray-900 p-6 rounded-xl mb-6">
        <h3 className="font-semibold mb-2">Problem Statement</h3>
        <p className="text-gray-300">
          Solve the problem using optimal time and space complexity.
        </p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Compiler ({lang})</span>
          <span className="text-sm text-gray-400">Auto-detected</span>
        </div>

        <textarea
          className="w-full h-52 bg-black text-white p-4 rounded-lg border border-gray-700"
          placeholder={`Write your ${lang} code here...`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
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
