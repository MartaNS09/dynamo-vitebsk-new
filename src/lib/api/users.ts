import { UserRole } from "@/types/auth.types";
import { AdminUser } from "@/types/user.types";

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

type UserPayload = {
  name: string;
  email?: string;
  role: UserRole;
  phone?: string;
  position?: string;
  bio?: string;
  isActive?: boolean;
};

export async function getUsers(): Promise<AdminUser[]> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/users`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Ошибка загрузки пользователей");
  return response.json();
}

export async function createUser(data: UserPayload & { password: string }) {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/users`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function updateUser(id: string, data: Partial<UserPayload>) {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error(await response.text());
}

export async function inviteUser(data: {
  email: string;
  name: string;
  role: UserRole;
  message?: string;
}): Promise<{ user: AdminUser; tempPassword: string; message: string | null }> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/users/invite`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
