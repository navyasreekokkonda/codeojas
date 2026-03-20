
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
  const [status, setStatus] = useState("default");

  const [testcases, setTestcases] = useState<Testcase[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  // Fetch question + testcases
  useEffect(() => {
    fetch(`/api/generate?topic=${topic}&level=${level}&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question || "Problem not found.");
        setTestcases(data.testcases || []);
      })
      .catch(() => setQuestion("Failed to load question"));
  }, [topic, level, lang]);

  // Language setup
  const languageExtension =
    lang === "Python"
      ? python()
      : lang === "JavaScript"
      ? javascript()
      : java();

  // Run Code
  const handleSubmit = async () => {
    if (!code.trim()) {
      setStatus("error");
      setResult("Please write code before running.");
      return;
    }

    setStatus("loading");
    setResult("Running code...");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: lang,
          stdin: testcases[activeTab]?.input || "",
        }),
      });

      const data = await res.json();
      const output = data.output || "";

      if (testcases.length > 0) {
        const expected = testcases[activeTab].expected.trim();

        if (output.trim() === expected) {
          setStatus("success");
        } else {
          setStatus("error");
        }

        setResult(
          `Output:\n${output}\n\nExpected:\n${expected}`
        );
      } else {
        setStatus("success");
        setResult(output || "No output received.");
      }
    } catch (err) {
      setStatus("error");
      setResult((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2 text-white">
        {topic} ({level})
      </h1>

      <p className="text-gray-400 mb-6">
        Language: <span className="text-orange-400">{lang}</span>
      </p>

      <div className="flex gap-6">

        {/* LEFT - QUESTION */}
        <div className="w-1/2 bg-gray-900 p-6 rounded-xl border border-gray-800 overflow-y-auto max-h-[80vh]">

          <h2 className="text-lg font-semibold text-orange-400 mb-4">
            Problem Statement
          </h2>

          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {question}
          </p>
        </div>

        {/* RIGHT - EDITOR */}
        <div className="w-1/2 bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col">

          <h2 className="text-lg font-semibold text-orange-400 mb-4">
            Compiler
          </h2>

          {/* Code Editor */}
          <div className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
            <CodeMirror
              value={code}
              height="300px"
              theme={oneDark}
              extensions={[languageExtension]}
              onChange={(value) => setCode(value)}
            />
          </div>

          {/* TESTCASE TABS */}
          {testcases.length > 0 && (
            <div className="mb-4">

              {/* Tabs */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {testcases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`
                      px-4 py-1 rounded-md text-sm font-medium
                      ${
                        activeTab === index
                          ? "bg-orange-500 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }
                    `}
                  >
                    Testcase {index + 1}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="bg-black border border-gray-700 rounded-lg p-3 text-sm">
                <p className="text-gray-400 mb-1">Input:</p>
                <pre className="text-gray-200 mb-3 whitespace-pre-wrap">
                  {testcases[activeTab]?.input}
                </pre>

                <p className="text-gray-400 mb-1">Expected Output:</p>
                <pre className="text-green-400 whitespace-pre-wrap">
                  {testcases[activeTab]?.expected}
                </pre>
              </div>
            </div>
          )}

          {/* RUN BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200"
          >
            Run Code
          </button>

          {/* RESULT */}
          {result && (
            <pre
              className={`mt-4 p-4 rounded-lg whitespace-pre-wrap overflow-x-auto text-sm
                ${
                  status === "success"
                    ? "bg-black border border-green-500 text-green-400"
                    : status === "error"
                    ? "bg-black border border-red-500 text-red-400"
                    : status === "loading"
                    ? "bg-black border border-yellow-500 text-yellow-400"
                    : "bg-black border border-gray-700 text-gray-300"
                }
              `}
            >
              {result}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}