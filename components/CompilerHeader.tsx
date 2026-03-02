import ErrorBadge from "./ErrorBadge";
import DifficultyBadge from "./DifficultyBadge";

type Props = {
  problem: string;
  language: string;
  errorType: "Syntax" | "Runtime" | "Logical" | "Interview";
  difficulty: "Easy" | "Medium" | "Hard";
};

export default function CompilerHeader({
  problem,
  language,
  errorType,
  difficulty,
}: Props) {
  return (
    <div className="border rounded-xl p-4 bg-gray-50 space-y-3">
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          Compiler Analysis
        </h2>

        <div className="flex gap-2">
          <DifficultyBadge level={difficulty} />
          <ErrorBadge type={errorType} />
        </div>
      </div>

      {/* Problem */}
      <div>
        <p className="text-sm text-gray-700 font-medium mb-1">
          Problem / Error Description
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {problem}
        </p>
      </div>

      {/* Meta Info */}
      <div className="flex gap-6 text-xs text-gray-500">
        <span>
          Language:{" "}
          <span className="font-medium text-gray-700">
            {language}
          </span>
        </span>

        <span>
          Mode:{" "}
          <span className="font-medium text-gray-700">
            Compiler Mentor
          </span>
        </span>
      </div>
    </div>
  );
}