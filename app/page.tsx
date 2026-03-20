"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const languages = ["Python", "JavaScript", "Java"];

export default function HomePage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("Python");

  const handleStart = () => {
    router.push(`/topics?lang=${selectedLang}`);
  };

  const handleLearn = () => {
    router.push("/learn");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* HERO */}
      <h1 className="text-5xl font-bold mb-6 text-center">
        Master Coding with Practice and Learning
      </h1>

      <p className="text-gray-400 max-w-2xl text-center mb-10">
        A complete platform to practice data structures and algorithms,
        learn programming step by step, and prepare for interviews.
      </p>

      {/* LANGUAGE SELECT */}
      <div className="flex gap-6 mb-10">
        {languages.map((lang) => (
          <div
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`
              cursor-pointer px-6 py-4 rounded-lg border transition
              ${
                selectedLang === lang
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-gray-900 border-gray-700 text-gray-300"
              }
            `}
          >
            {lang}
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition"
        >
          Start Coding
        </button>

        <button
          onClick={handleLearn}
          className="border border-orange-500 text-orange-400 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition"
        >
          Learn Programming
        </button>
      </div>

    </div>
  );
}