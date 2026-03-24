import { API_BASE_URL } from "@/config/api";
import {
  Application,
  ApplicationStatus,
  ApplicationFilters,
} from "@/types/application.types";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("access_token") || localStorage.getItem("token")
    );
  }
  return null;
};

export async function getApplications(filters: ApplicationFilters = {}) {
  const token = getAuthToken();

  console.log(
    "🔑 Токен для заявок:",
    token ? "есть (длина " + token.length + ")" : "нет",
  );

  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.search) params.append("search", filters.search);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (filters.assignedTo) params.append("assignedTo", filters.assignedTo);
  // if (filters.page) params.append("page", filters.page.toString());
  // if (filters.limit) params.append("limit", filters.limit.toString());

  const url = `${API_BASE_URL}/applications?${params}`;
  console.log("📡 URL запроса:", url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Статус ответа:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Текст ошибки:", errorText);
      throw new Error(
        `Ошибка загрузки заявок: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    console.log("✅ Получены данные:", data);
    return data;
  } catch (error) {
    console.error("❌ Исключение в getApplications:", error);
    throw error;
  }
}

export async function getApplicationStats() {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/applications/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка загрузки статистики");
  }

  return response.json();
}

// 🔧 ИСПРАВЛЕННАЯ ФУНКЦИЯ С ЛОГАМИ
export async function getApplication(id: string) {
  const token = getAuthToken();

  console.log("🔍 ЗАГРУЗКА ЗАЯВКИ ID:", id);
  console.log("🔑 Токен:", token ? "есть (длина " + token.length + ")" : "нет");
  console.log("📡 URL:", `${API_BASE_URL}/applications/${id}`);

  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Статус ответа:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Текст ошибки:", errorText);
      throw new Error(`Заявка не найдена: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Получены данные заявки:", data);
    return data;
  } catch (error) {
    console.error("❌ Исключение в getApplication:", error);
    throw error;
  }
}

export async function createApplication(data: any) {
  // Публичный эндпоинт - без токена
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка создания заявки");
  }

  return response.json();
}

// 🔧 ИСПРАВЛЕННАЯ ФУНКЦИЯ updateApplication С ЛОГАМИ
export async function updateApplication(id: string, data: any) {
  const token = getAuthToken();
  console.log("🔄 Обновление заявки ID:", id);
  console.log("📤 Данные:", data);

  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  console.log("📥 Статус:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Ошибка:", errorText);
    throw new Error(`Ошибка обновления заявки: ${response.status}`);
  }

  const result = await response.json();
  console.log("✅ Заявка обновлена:", result);
  return result;
}

export async function deleteApplication(id: string) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка удаления заявки");
  }

  return response.json();
}
