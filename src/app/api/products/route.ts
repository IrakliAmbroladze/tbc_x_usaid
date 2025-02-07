import { createClient } from "@/lib/supabase/server";

export const GET = async (req: Request): Promise<Response> => {
  const { headers } = req;
  const sortBy = headers.get("sortBy") || "id";
  const order = headers.get("order") || "desc";
  const query = headers.get("query") || "";

  const minPriceHeader = headers.get("minPrice");
  let minPrice = 0;

  if (minPriceHeader !== null) {
    const parsedPrice = Number(minPriceHeader);
    minPrice = isNaN(parsedPrice) || parsedPrice < 0 ? 0 : parsedPrice;
  }

  const maxPriceHeader = headers.get("maxPrice");
  let maxPrice = 1000000;

  if (maxPriceHeader !== null) {
    const parsedPrice = Number(maxPriceHeader);
    maxPrice = isNaN(parsedPrice) || parsedPrice < 0 ? 0 : parsedPrice;
  }

  const supabase = await createClient();

  const createResponse = (body: object, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .ilike("title_en", `%${query}%`)
      .order(sortBy, { ascending: order === "asc" })
      .gte("price", minPrice)
      .lte("price", maxPrice);

    if (error) {
      return createResponse({ error: error.message }, 500);
    }

    if (!Array.isArray(products)) {
      return createResponse({ error: "The result is not an array." }, 500);
    }

    return createResponse(products, 200);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return createResponse({ error: errorMessage }, 500);
  }
};
