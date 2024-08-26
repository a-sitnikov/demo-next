import { fetchCatalog } from "@/api/catalog";
import { searchParamsToObject } from "@/utils/filters";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const data = await fetchCatalog(searchParamsToObject(url.searchParams));
  return new Response(JSON.stringify(data));
}
