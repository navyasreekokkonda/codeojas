"use client";
export const dynamic = "force-dynamic";

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

  // CodeMirror language
  const languageExtension =
    lang === "Python"
      ? python()
      : lang === "JavaScript"
      ? javascript()
      : java();

  const handleSubmit = async () => {
    if (!code.trim()) {
      setResult("Please write code before submitting.");
      return;
    }

    if (testcases.length === 0) {
      setResult("No testcases found.");
      return;
    }

    setResult("Running code...");

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
        const isPass = output === tc.expected.trim();

        if (isPass) passed++;

        outputs.push(
          `Testcase ${i + 1}: ${isPass ? "Passed" : "Failed"}
Input: ${tc.input}
Output: ${output}
Expected: ${tc.expected}
`
        );
      } catch (err) {
        outputs.push(
          `Testcase ${i + 1}: Error\n${(err as Error).message}`
        );
      }
    }

    const score = Math.floor((passed / testcases.length) * 100);

    setResult(
      `Score: ${score}/100 | Passed: ${passed}/${testcases.length}\n\n${outputs.join(
        "\n"
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-10">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2 text-white">
        {topic} ({level})
      </h1>

      <p className="text-gray-400 mb-6">
        Language: <span className="text-orange-400 font-medium">{lang}</span>
      </p>

      {/* MAIN LAYOUT */}
      <div className="flex gap-6">

        {/* LEFT PANEL */}
        <div className="w-1/2 bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg overflow-y-auto max-h-[80vh]">

          <h2 className="text-lg font-semibold text-orange-400 mb-4">
            Problem Statement
          </h2>

          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {question}
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col">

          <h2 className="text-lg font-semibold text-orange-400 mb-4">
            Compiler
          </h2>

          {/* Code Editor */}
          <div className="border border-gray-700 rounded-lg overflow-hidden mb-4">
            <CodeMirror
              value={code}
              height="300px"
              theme={oneDark}
              extensions={[languageExtension]}
              onChange={(value) => setCode(value)}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="
              w-full
              py-3
              rounded-lg
              font-semibold
              text-white
              bg-orange-500
              hover:bg-orange-600
              active:scale-95
              transition-all
              duration-200
              shadow-md
            "
          >
            Submit Code
          </button>

          {/* RESULT */}
          {result && (
            <pre className="mt-4 p-4 bg-black border border-gray-700 rounded-lg text-gray-300 whitespace-pre-wrap overflow-x-auto text-sm">
              {result}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}