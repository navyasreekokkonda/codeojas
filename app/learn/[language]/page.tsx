"use client";

import { useParams } from "next/navigation";
import { learningContent } from "@/data/learningContent";

export default function LanguagePage() {
  const params = useParams();

  const rawLang = params?.language;

  if (!rawLang) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No language selected
      </div>
    );
  }

  // ✅ normalize language
  const language = rawLang.toString().toLowerCase();

  const content = learningContent[language as keyof typeof learningContent];

  // ❌ No data case
  if (!content) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        ❌ No content found for {language}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-10 text-center capitalize">
        {language} Learning Path
      </h1>

      {/* DAY CARDS */}
      {content.map((day, index) => (
        <div
          key={index}
          className="
            mb-10 
            bg-gray-900 
            p-6 
            rounded-2xl 
            border border-gray-800 
            hover:border-orange-500 
            transition
          "
        >

          {/* DAY TITLE */}
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">
            {day.day}: {day.title}
          </h2>

          {/* VIDEO */}
          {day.video && (
            <div className="mb-4">
              <iframe
                width="100%"
                height="300"
                src={day.video.replace("watch?v=", "embed/")}
                title="YouTube video"
                className="rounded-lg"
                allowFullScreen
              />
            </div>
          )}

          {/* PDF */}
          {day.pdf && (
            <a
              href={day.pdf}
              target="_blank"
              className="text-orange-400 underline block mb-4"
            >
              View Notes (PDF)
            </a>
          )}

          {/* ELI10 */}
          {day.eli10 && (
            <p className="mb-3 text-green-400">
              <strong>ELI10:</strong> {day.eli10}
            </p>
          )}

          {/* NORMAL EXPLANATION */}
          {day.explanation && (
            <p className="mb-4 text-gray-300">
              <strong>Explanation:</strong> {day.explanation}
            </p>
          )}

          {/* ASSIGNMENTS */}
          {day.assignments && (
            <div>
              <h3 className="text-orange-400 font-semibold mb-2">
                Assignments
              </h3>

              <ul className="list-disc ml-6 text-gray-300">
                {day.assignments.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

    </div>
  );
}