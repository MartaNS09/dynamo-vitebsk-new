import { Suspense } from "react";
import { SportsPageClient } from "./SportsPageClient";
import Loading from "./loading";

export default function SportsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SportsPageClient />
    </Suspense>
  );
}
