import { Suspense } from "react";
import TopicsClient from "./TopicsClient";

export default function TopicsPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading topics...</div>}>
      <TopicsClient />
    </Suspense>
  );
}