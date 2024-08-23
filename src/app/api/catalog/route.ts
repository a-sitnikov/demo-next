import { fetchCatalog } from "@/api/catalog";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const data = await fetchCatalog(url.searchParams);
  return new Response(JSON.stringify(data));
}
