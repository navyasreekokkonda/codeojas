import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔹 Accept multiple possible field names (UI-safe)
    const problem =
      body.problem ||
      body.prompt ||
      body.topic ||
      body.question ||
      "";

    const language =
      body.language ||
      body.lang ||
      "General Programming";

    if (!problem.trim()) {
      return NextResponse.json(
        { result: "Please enter a problem or question to explain." },
        { status: 400 }
      );
    }

    const prompt = `
You are an AI Programming Mentor.

STRICT RULES (VERY IMPORTANT):
- DO NOT generate any programming code
- DO NOT show syntax blocks
- DO NOT show snippets
- ONLY explain in ${language}
- Behave like a COMPILER + TEACHER
- If errors exist:
  - Name the error
  - Explain why it occurs in ${language}
  - Explain how to fix it conceptually (NO CODE)
- Use bullet points
- Beginner friendly
- Interview ready

User Problem:
${problem}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const result =
      completion.choices[0]?.message?.content ||
      "No explanation generated.";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json(
      { result: "AI service error. Please try again later." },
      { status: 500 }
    );
  }
}