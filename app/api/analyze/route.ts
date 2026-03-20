import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, lang } = await req.json();

  if (!code) {
    return NextResponse.json({
      feedback: "Error: No code provided.",
    });
  }

  const prompt = `
You are an expert ${lang} coding interviewer.

Analyze the following code step by step:

1. Check for syntax errors
2. Check for logical mistakes
3. Explain issues clearly in simple terms
4. Provide corrected code if needed
5. Suggest optimizations if possible

Keep response clean, structured, and easy to read.

Code:
${code}
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
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
    data?.choices?.[0]?.message?.content ||
    "Analysis failed. Please try again.";

  return NextResponse.json({ feedback });
}