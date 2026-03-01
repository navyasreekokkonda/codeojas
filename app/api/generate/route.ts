import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic"; // 🚨 disables caching

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

function randomId() {
  return Math.random().toString(36).slice(2);
}

export async function POST(req: Request) {
  const { language, topic, level, nonce } = await req.json();

  const prompt = `
You are an AI that creates NEVER-REPEATED coding problems.

Rules:
- Topic: ${topic}
- Difficulty: ${level}
- Language: ${language}
- Unique Seed: ${nonce}-${randomId()}
- Avoid ALL common problems (Two Sum, Reverse Array, Kadane, etc.)
- Create a real-world, scenario-based problem
- Do NOT include solution or hints
- Output ONLY valid JSON

JSON format:
{
  "title": "",
  "problem": "",
  "input": "",
  "output": "",
  "constraints": ""
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.9,
    top_p: 0.95,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = completion.choices[0].message.content;

  return NextResponse.json(JSON.parse(raw!));
}