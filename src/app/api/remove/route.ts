import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request): Promise<Response> {
  const createResponse = (body: object, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const supabase = await createClient();
    const authHeader = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!authHeader) {
      return createResponse({ error: "Missing auth token" }, 401);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(authHeader);

    const body = await req.json();
    const { product_id } = body;

    if (!user || !product_id) {
      return createResponse({ error: "Invalid product_id or user" }, 400);
    }

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", product_id);

    if (error) {
      console.error("Supabase error:", error.message);
      return createResponse(
        { error: "Failed to remove product from cart" },
        500,
      );
    }

    return new Response(
      JSON.stringify({ message: "Product removed successfully from cart" }),
      { status: 200 },
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error removing product:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
