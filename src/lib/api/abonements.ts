import { Abonement } from "@/types/sport-section.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getAbonementsBySection(
  sectionId: string,
): Promise<Abonement[]> {
  const res = await fetch(`${API_BASE_URL}/abonements/section/${sectionId}`);
  if (!res.ok) throw new Error("Ошибка загрузки абонементов");
  return res.json();
}

export async function createAbonement(
  data: Partial<Abonement>,
): Promise<Abonement> {
  const token = localStorage.getItem("access_token");
  console.log("📦 Отправляем данные абонемента:", data);

  const res = await fetch(`${API_BASE_URL}/abonements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Ошибка создания абонемента:", res.status, errorText);
    throw new Error("Ошибка создания абонемента");
  }

  const result = await res.json();
  console.log("✅ Абонемент создан:", result);
  return result;
}

export async function updateAbonement(
  id: string,
  data: Partial<Abonement>,
): Promise<Abonement> {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}/abonements/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка обновления абонемента");
  return res.json();
}

export async function deleteAbonement(id: string): Promise<void> {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}/abonements/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Ошибка удаления абонемента");
}
