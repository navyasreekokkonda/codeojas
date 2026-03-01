import { Suspense } from "react";
import dynamic from "next/dynamic";

// ✅ rename import to avoid conflict
const QuestionClientDynamic = dynamic(
  () => import("./QuestionClient"),
  { ssr: false }
);

// ✅ this is required by Next.js
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function QuestionPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading question...</div>}>
      <QuestionClientDynamic />
    </Suspense>
  );
}
