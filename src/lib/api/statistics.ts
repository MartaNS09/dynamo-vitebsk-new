import { DashboardStats } from "@/types/statistics.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const NORMALIZED_API_BASE_URL = API_BASE_URL.replace(/\/+$/, "");

function authHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getDashboardStatistics(): Promise<DashboardStats> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/statistics/dashboard`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки статистики");
  }
  return response.json();
}
