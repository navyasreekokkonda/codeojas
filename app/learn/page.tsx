"use client";

import { useRouter } from "next/navigation";

const languages = [
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "javascript" },
  { label: "C++", value: "cpp" },
];

export default function LearnPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Learn Programming
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {languages.map((lang) => (
          <div
            key={lang.value}
            onClick={() => router.push(`/learn/${lang.value}`)}
            className="
              cursor-pointer
              p-6
              rounded-2xl
              bg-gray-900
              hover:bg-orange-500
              transition
              text-center
            "
          >
            <h2 className="text-xl font-semibold">{lang.label}</h2>
          </div>
        ))}

      </div>
    </div>
  );
}