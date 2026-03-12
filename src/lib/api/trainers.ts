import { Trainer } from "@/types/sport-section.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getTrainersBySection(
  sectionId: string,
): Promise<Trainer[]> {
  const res = await fetch(`${API_BASE_URL}/trainers/section/${sectionId}`);
  if (!res.ok) throw new Error("Ошибка загрузки тренеров");
  return res.json();
}

export async function createTrainer(data: Partial<Trainer>): Promise<Trainer> {
  const token = localStorage.getItem("access_token");
  console.log("📦 Отправляем данные тренера:", data);

  const res = await fetch(`${API_BASE_URL}/trainers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Ошибка создания тренера:", res.status, errorText);
    throw new Error("Ошибка создания тренера");
  }

  const result = await res.json();
  console.log("✅ Тренер создан:", result);
  return result;
}

export async function updateTrainer(
  id: string,
  data: Partial<Trainer>,
): Promise<Trainer> {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}/trainers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Ошибка обновления тренера:", res.status, errorText);
    throw new Error("Ошибка обновления тренера");
  }
  const result = await res.json();
  console.log("✅ Тренер обновлен:", result);
  return result;
}

export async function deleteTrainer(id: string): Promise<void> {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}/trainers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Ошибка удаления тренера:", res.status, errorText);
    throw new Error("Ошибка удаления тренера");
  }
  console.log("✅ Тренер удален:", id);
}
