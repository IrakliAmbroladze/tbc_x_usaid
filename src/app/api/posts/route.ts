import { createClient } from "@/lib/supabase/server";

export const GET = async (req: Request) => {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const query = searchParams.get("query") || "";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let supabaseQuery = supabase.from("posts").select("*", { count: "exact" });

    if (query) {
      supabaseQuery = supabaseQuery.ilike("title_en", `%${query}%`);
    }

    const { data: posts, error } = await supabaseQuery.range(from, to);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    let countQuery = supabase
      .from("posts")
      .select("*", { count: "exact", head: true });

    if (query) {
      countQuery = countQuery.ilike("title_en", `%${query}%`);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      return new Response(JSON.stringify({ error: countError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ posts, total: count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
