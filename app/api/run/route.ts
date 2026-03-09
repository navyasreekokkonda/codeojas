import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    // Map language to Judge0 language_id
    const languageMap: any = {
      Python: 71,
      JavaScript: 63,
      Java: 62,
    };
    const language_id = languageMap[language] || 71;

    // Prepare Judge0 request
    const response = await fetch(
      "https://judge0-ce.p.sulu.sh/submissions?wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id,
          stdin: "", // can be test case input later
        }),
      }
    );

    const result = await response.json();

    // Get output or error
    const output = result.stdout
      ? Buffer.from(result.stdout, "base64").toString()
      : result.stderr
      ? Buffer.from(result.stderr, "base64").toString()
      : "No output";

    return NextResponse.json({ output });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message });
  }
}