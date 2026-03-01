import { Suspense } from "react";
import dynamic from "next/dynamic";

const QuestionClient = dynamic(() => import("./QuestionClient"), {
  ssr: false,
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function QuestionPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading question...</div>}>
      <QuestionClient />
    </Suspense>
  );
}
