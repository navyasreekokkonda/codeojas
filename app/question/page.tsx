import { Suspense } from "react";
import nextDynamic from "next/dynamic";

// ✅ renamed import — NO conflict now
const QuestionClient = nextDynamic(
  () => import("./QuestionClient"),
  { ssr: false }
);

// ✅ Next.js dynamic rendering flag
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function QuestionPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading question...</div>}>
      <QuestionClient />
    </Suspense>
  );
}
