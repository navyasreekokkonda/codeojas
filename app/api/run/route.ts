import { NextResponse } from "next/server";

// Sample test cases (replace with dynamic ones for each problem)
const testcases = [
  { input: "nums = [1,2,3,4]", output: "10" },
  { input: "nums = [5,5,5]", output: "15" },
];

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    const languageMap: Record<string, number> = {
      Python: 71,
      JavaScript: 63,
      Java: 62,
    };

    if (!languageMap[language]) {
      return NextResponse.json(
        { error: "Unsupported language" },
        { status: 400 }
      );
    }

    const results: any[] = [];
    let passedCount = 0;

    // Run each test case
    for (const tc of testcases) {
      let userCode = code;

      // For Python, prepend the input as code
      if (language === "Python") {
        userCode = `${tc.input}\n${code}`;
      } else if (language === "JavaScript") {
        userCode = `${tc.input};\n${code}`;
      }

      // Call Judge0 CE API
      const res = await fetch(
        "https://judge0-ce.p.sulu.sh/submissions?wait=true",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: userCode,
            language_id: languageMap[language],
          }),
        }
      );

      const data = await res.json();

      // Trim output and expected for safe comparison
      const userOutput = (data.stdout || "").trim();
      const expectedOutput = tc.output.trim();

      const passed = userOutput === expectedOutput;

      if (passed) passedCount++;

      results.push({
        input: tc.input,
        expected: tc.output,
        output: userOutput,
        status: passed ? "✅ Passed" : "❌ Failed",
      });
    }

    const score = Math.round((passedCount / testcases.length) * 100);

    return NextResponse.json({
      results,
      total: testcases.length,
      passed: passedCount,
      score: score,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error: " + (err as Error).message },
      { status: 500 }
    );
  }
}