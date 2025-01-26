import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { user_id, product_id, quantity } = body;

    if (!user_id || !product_id || !quantity) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("cart")
      .upsert(
        [
          {
            user_id,
            product_id,
            quantity,
          },
        ],
        { onConflict: "user_id, product_id" },
      )
      .select("*");

    if (error) {
      console.error("Supabase error:", error.message);
      return new Response(
        JSON.stringify({ error: "Failed to add product to supabase cart" }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Product added successfully to cart",
        product: data,
      }),
      { status: 200 },
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error adding product:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
