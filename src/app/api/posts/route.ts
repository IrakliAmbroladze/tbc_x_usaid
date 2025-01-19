// import { SupabaseClient } from "@supabase/supabase-js";
// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_KEY!;

import { createClient } from "../../../utils/supabase/server";

export const GET = async () => {
  const supabase = await createClient();

  // const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
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
