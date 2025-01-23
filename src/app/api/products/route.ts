import { createClient } from "../../../utils/supabase/server";

export const GET = async (req: Request): Promise<Response> => {
  const { headers } = req;
  const sortBy = headers.get("sortBy") || "id";
  const order = headers.get("order") || "asc";
  const query = headers.get("query") || "";

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
      .order(sortBy, { ascending: order === "asc" });

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
