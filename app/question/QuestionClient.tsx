import { Suspense } from "react";
import QuestionClient from "./QuestionClient";

// ✅ Tell Next.js this page is dynamic (no static prerender)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function QuestionPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading question...</div>}>
      <QuestionClient />
    </Suspense>
  );
}
