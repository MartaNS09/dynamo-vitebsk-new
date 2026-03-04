export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  SECTIONS: `${API_BASE_URL}/sections`,
  SECTION_BY_ID: (id: string) => `${API_BASE_URL}/sections/${id}`,
  SECTION_BY_SLUG: (slug: string) => `${API_BASE_URL}/sections/slug/${slug}`,
};
