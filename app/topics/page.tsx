import { Suspense } from "react";
import TopicsClient from "./TopicsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function TopicsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading topics...</div>}>
      <TopicsClient />
    </Suspense>
  );
}
