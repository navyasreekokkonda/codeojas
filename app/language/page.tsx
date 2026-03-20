"use client";

import { useRouter } from "next/navigation";

const languages = [
  { name: "Python", value: "python", icon: "🐍" },
  { name: "Java", value: "java", icon: "☕" },
  { name: "C++", value: "cpp", icon: "⚙️" }
];

export default function LanguagePage() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center px-6">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px]" />

      <div className="relative z-10 text-center">

        {/* Heading */}
        <h2 className="text-5xl font-extrabold mb-6">
          Choose Your <span className="text-orange-500">Language</span>
        </h2>

        <p className="text-gray-400 mb-12">
          Select a programming language to start solving AI-generated problems.
        </p>

        {/* Language cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => router.push(`/topics?lang=${lang.value}`)}
              className="
              backdrop-blur-lg
              bg-white/5
              border border-white/10
              rounded-2xl
              px-12 py-10
              text-xl font-semibold
              flex flex-col items-center gap-3
              hover:border-orange-500
              hover:scale-105
              transition
              "
            >

              <span className="text-4xl">{lang.icon}</span>
              {lang.name}

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}