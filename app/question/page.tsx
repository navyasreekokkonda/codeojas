import { Suspense } from "react";
import QuestionClient from "./QuestionClient";

export default function QuestionPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading question…</div>}>
      <QuestionClient />
    </Suspense>
  );
}