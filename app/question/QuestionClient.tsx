"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";

type Testcase = {
  input: string;
  expected: string;
};

export default function QuestionClient() {
  const params = useSearchParams();
  const lang = params.get("lang") || "Python";
  const topic = params.get("topic") || "Arrays";
  const level = params.get("level") || "Easy";

  const [question, setQuestion] = useState("Loading question...");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [testcases, setTestcases] = useState<Testcase[]>([]);

  // Load question + testcases
  useEffect(() => {
    fetch(`/api/generate?topic=${topic}&level=${level}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question || "Problem not found.");
        setTestcases(data.testcases || []);
      })
      .catch(() => setQuestion("Failed to load question"));
  }, [topic, level]);

  // Determine CodeMirror language
  const languageExtension =
    lang === "Python"
      ? python()
      : lang === "JavaScript"
      ? javascript()
      : java();

  const handleSubmit = async () => {
    if (!code.trim()) {
      setResult("❌ Please write code before submitting.");
      return;
    }

    if (testcases.length === 0) {
      setResult("⚠️ No testcases found for this problem.");
      return;
    }

    setResult("⏳ Running code against testcases...");

    let passed = 0;

    const outputs: string[] = [];

    for (let i = 0; i < testcases.length; i++) {
      const tc = testcases[i];

      try {
        const res = await fetch("/api/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            language: lang,
            stdin: tc.input,
          }),
        });

        const data = await res.json();
        const output = data.output?.trim() || "";
        const status = output === tc.expected.trim() ? "✅ Passed" : "❌ Failed";

        if (status === "✅ Passed") passed++;

        outputs.push(
          `Testcase ${i + 1}: ${status}\nInput: ${tc.input}\nOutput: ${output}\nExpected: ${tc.expected}\n`
        );
      } catch (err) {
        outputs.push(
          `Testcase ${i + 1}: ❌ Error\nError: ${(err as Error).message}`
        );
      }
    }

    const score = Math.floor((passed / testcases.length) * 100);

    setResult(
      `🏆 Score: ${score}/100 | Passed: ${passed}/${testcases.length}\n\n${outputs.join(
        "\n"
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">
        {topic} ({level})
      </h1>
      <p className="text-gray-400 mb-6">Language: {lang}</p>

      {/* Left-Right Layout */}
      <div className="flex gap-6">

        {/* LEFT — Problem */}
        <div className="w-1/2 bg-gray-900 p-6 rounded-xl overflow-y-auto max-h-[80vh]">
          <h2 className="font-semibold mb-4 text-lg">Problem Statement</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{question}</p>
        </div>

        {/* RIGHT — Editor + Submit */}
        <div className="w-1/2 bg-gray-900 p-6 rounded-xl flex flex-col">
          <h2 className="font-semibold mb-4 text-lg">Compiler</h2>

          <CodeMirror
            value={code}
            height="300px"
            theme={oneDark}
            extensions={[languageExtension]}
            onChange={(value) => setCode(value)}
            className="mb-4 rounded-lg"
          />

          <button
            onClick={handleSubmit}
            className="mt-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
          >
            Submit Code
          </button>

          {result && (
            <pre className="mt-4 p-4 bg-black border border-gray-700 rounded-lg whitespace-pre-wrap overflow-x-auto">
              {result}
            </pre>
          )}
        </div>

      </div>
    </div>
  );
}