// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "https://cbhoxdzzhvcuajscuqes.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;

import { createClient } from "../../../utils/supabase/server";

export const GET = async () => {
  const supabase = await createClient();
  // const supabase = createClient(supabaseUrl, supabaseKey);
  try {
    let { data: products, error } = await supabase.from("products").select("*");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(products)) {
      return new Response(JSON.stringify({ error: "არ არის მასივი" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
