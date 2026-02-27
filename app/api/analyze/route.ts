import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const { language, problem, code } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { result: "❌ API key missing" },
      { status: 500 }
    );
  }

  const prompt = `
You are a DSA mentor.

Language: ${language}
Problem: ${problem}

User Code:
${code}

Rules:
- DO NOT provide full code solution
- If code is wrong, explain mistakes step-by-step
- If correct, appreciate and suggest next topic
- Respond ONLY in ${language} context
- No markdown, no code blocks
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({
    result: completion.choices[0].message.content,
  });
}