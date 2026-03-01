import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const { code, language, problem } = await req.json();

  if (!code || code.trim().length === 0) {
    return NextResponse.json({
      status: "wrong",
      explanation: "❌ No code submitted. Please write code before submitting.",
      corrected_code: "",
    });
  }

  const prompt = `
You are a senior ${language} engineer.

Problem:
${problem}

User Code:
${code}

TASKS:
1. Analyze code LINE BY LINE
2. Detect syntax errors, logic mistakes, edge cases
3. If wrong:
   - Explain each error clearly
   - Provide corrected ${language} code
4. If correct:
   - Appreciate
   - Suggest improvements

Return ONLY JSON:
{
  "status": "correct" | "wrong",
  "explanation": "",
  "corrected_code": ""
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = completion.choices[0].message.content;
  return NextResponse.json(JSON.parse(raw!));
}