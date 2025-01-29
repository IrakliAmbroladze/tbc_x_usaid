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

    const { data: orderItems, error: orderError } = await supabase
      .from("orders")
      .select("product_id, quantity, created_at, stripe_payment_id")
      .eq("user_id", user.id);

    if (orderError) {
      console.error("Supabase error:", orderError.message);
      return createResponse({ error: "Failed to fetch order items" }, 500);
    }

    if (!orderItems || orderItems.length === 0) {
      return createResponse({ error: "No products in order" }, 404);
    }

    const productIds = orderItems.map((item) => item.product_id);

    const { data: products, error: productError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (productError) {
      console.error("Supabase error:", productError.message);
      return createResponse({ error: "Failed to fetch product details" }, 500);
    }

    const productsWithQuantity = products.map((product) => {
      const orderItem = orderItems.find(
        (item) => item.product_id === product.id,
      );
      return {
        ...product,
        quantity: orderItem ? orderItem.quantity : 0,
        stripe_payment_id: orderItem ? orderItem.stripe_payment_id : 0,
        created_at: orderItem ? orderItem.created_at : 0,
      };
    });

    return createResponse(productsWithQuantity, 200);
  } catch (err) {
    console.error(
      "Error fetching order and products:",
      err instanceof Error ? err.message : "Unknown error",
    );
    return createResponse({ error: "Internal server error" }, 500);
  }
}
