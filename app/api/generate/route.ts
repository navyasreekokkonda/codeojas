import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const topic = searchParams.get("topic");
  const level = searchParams.get("level");
  const lang = searchParams.get("lang") || "Any";

  if (!topic || !level) {
    return NextResponse.json({ question: "Invalid request" }, { status: 400 });
  }

  const prompt = `
Generate ONE unique coding interview problem.

Topic: ${topic}
Difficulty: ${level}
Language: ${lang}

Rules:
- Must be different every time
- No solution
- No hints
- Clear problem statement
- Suitable for coding interview
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
    }),
  });

  const data = await response.json();

  const question =
    data?.choices?.[0]?.message?.content || "Failed to generate question";

  return NextResponse.json({ question });
}