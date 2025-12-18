import { Suspense } from "react";
import { SportsPageClient } from "./SportsPageClient";

export default function SportsPage() {
  return (
    <Suspense fallback={<SportsLoading />}>
      <SportsPageClient />
    </Suspense>
  );
}

function SportsLoading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-lg font-medium">Загружаем спортивные секции...</p>
      </div>
    </div>
  );
}
