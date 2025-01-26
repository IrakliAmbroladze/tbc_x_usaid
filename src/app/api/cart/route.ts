import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request): Promise<Response> {
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
      error,
    } = await supabase.auth.getUser(authHeader);
    if (error || !user) {
      return createResponse({ error: "Invalid or expired token" }, 401);
    }

    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select("product_id, quantity")
      .eq("user_id", user.id);

    if (cartError) {
      console.error("Supabase error:", cartError.message);
      return createResponse({ error: "Failed to fetch cart items" }, 500);
    }

    if (!cartItems || cartItems.length === 0) {
      return createResponse({ error: "No products in cart" }, 404);
    }

    const productIds = cartItems.map((item) => item.product_id);

    const { data: products, error: productError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (productError) {
      console.error("Supabase error:", productError.message);
      return createResponse({ error: "Failed to fetch product details" }, 500);
    }

    const productsWithQuantity = products.map((product) => {
      const cartItem = cartItems.find((item) => item.product_id === product.id);
      return {
        ...product,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });

    return createResponse(productsWithQuantity, 200);
  } catch (err) {
    console.error(
      "Error fetching cart and products:",
      err instanceof Error ? err.message : "Unknown error",
    );
    return createResponse({ error: "Internal server error" }, 500);
  }
}
