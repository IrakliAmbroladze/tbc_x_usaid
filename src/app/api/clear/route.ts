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

    if (!user) {
      return createResponse({ error: "Invalid user" }, 400);
    }

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Supabase error:", error.message);
      return createResponse({ error: "Failed to clear cart" }, 500);
    }

    return new Response(
      JSON.stringify({ message: "Cart cleared successfully" }),
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error clearing cart:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
