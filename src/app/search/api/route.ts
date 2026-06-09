import { runSiteSearch } from "@/lib/search/runSiteSearch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  if (query.length < 2) {
    return Response.json([]);
  }

  try {
    const results = await runSiteSearch(query);
    return Response.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return Response.json([]);
  }
}
