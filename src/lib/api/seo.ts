// import { API_BASE_URL } from "@/config/api";

// export async function getSeoForPage(page: string) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/seo/${page}`, {
//       // Добавляем кэширование на 60 секунд
//       next: { revalidate: 60 },
//     });

//     if (!response.ok) {
//       return null;
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`Error fetching SEO for ${page}:`, error);
//     return null;
//   }
// }

export async function getSeoForPage(page: string) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${backendUrl}/seo/${page}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.log(`SEO not found for ${page}, using defaults`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching SEO for ${page}:`, error);
    return null;
  }
}
