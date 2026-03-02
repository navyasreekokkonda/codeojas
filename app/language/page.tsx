"use client";

import { useRouter } from "next/navigation";

const languages = ["Python", "Java", "C++"];

export default function LanguagePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8">Choose Your Language</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => router.push(`/topics?lang=${lang}`)}
            className="px-10 py-6 bg-gray-900 border border-gray-700 rounded-xl hover:border-indigo-500"
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
}