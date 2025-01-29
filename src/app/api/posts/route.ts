import { createClient } from "../../../lib/supabase/server";

export const GET = async () => {
  const supabase = await createClient();

  try {
    const { data: posts, error } = await supabase.from("posts").select("*");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(posts)) {
      return new Response(JSON.stringify({ error: "არ არის მასივი" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
