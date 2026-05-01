import { Application, ApplicationStatus } from "@/types/application.types";
import { trackEvent } from "@/lib/analytics/track";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const NORMALIZED_API_BASE_URL = API_BASE_URL.replace(/\/+$/, "");

function authHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/applications`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки заявок");
  }
  return response.json();
}

export async function getApplicationById(id: string): Promise<Application> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/applications/${id}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Заявка не найдена");
  }
  return response.json();
}

export async function createApplication(payload: {
  name: string;
  phone: string;
  email?: string;
  childAge?: number;
  sport?: string;
  message?: string;
  source?: string;
  sectionId?: string;
  sectionName?: string;
  selectedAbonement?: unknown;
  consentGiven: boolean;
  consentVersion?: string;
}): Promise<Application> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/applications`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Ошибка создания заявки");
  }
  const created = await response.json();
  trackEvent("application_submit", {
    source: payload.source || "unknown",
    has_email: Boolean(payload.email),
    has_sport: Boolean(payload.sport),
  });
  return created;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  comment?: string,
): Promise<Application> {
  const response = await fetch(
    `${NORMALIZED_API_BASE_URL}/applications/${id}/status`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ status, comment }),
    },
  );
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Ошибка обновления статуса");
  }
  return response.json();
}

export async function addApplicationNote(
  id: string,
  text: string,
): Promise<Application> {
  const response = await fetch(
    `${NORMALIZED_API_BASE_URL}/applications/${id}/notes`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ text }),
    },
  );
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Ошибка добавления заметки");
  }
  return response.json();
}

export async function deleteApplication(id: string): Promise<void> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/applications/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Ошибка удаления заявки");
  }
}
