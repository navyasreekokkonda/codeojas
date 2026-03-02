import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, lang } = await req.json();

  if (!code) {
    return NextResponse.json({
      feedback: "❌ No code provided.",
    });
  }

  const prompt = `
You are an expert ${lang} coding interviewer.

Analyze the following code line by line:
- Detect syntax errors
- Detect logical errors
- Explain mistakes clearly
- If incorrect, provide corrected code
- If correct, suggest optimizations

Code:
${code}
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
      temperature: 0.3,
    }),
  });

  const data = await response.json();

  const feedback =
    data?.choices?.[0]?.message?.content || "AI analysis failed.";

  return NextResponse.json({ feedback });
}