import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request): Promise<Response> {
  const createResponse = (body: object, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const { headers } = req;
    const user_id = headers.get("user_id");
    const supabase = await createClient();

    if (!user_id) {
      return createResponse({ error: "Missing user_id" }, 400);
    }

    // Fetch product_id and quantity from the "cart" table
    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select("product_id, quantity")
      .eq("user_id", user_id);

    // .select("product_id, quantity");

    if (cartError) {
      console.error("Supabase error:", cartError.message);
      return createResponse({ error: "Failed to fetch cart items" }, 500);
    }

    if (!cartItems || cartItems.length === 0) {
      return createResponse({ error: "No products in cart" }, 404);
    }

    // Extract product_ids
    const productIds = cartItems.map((item) => item.product_id);

    // Fetch product details from the "products" table
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (productError) {
      console.error("Supabase error:", productError.message);
      return createResponse({ error: "Failed to fetch product details" }, 500);
    }

    // Merge quantity from cartItems into the product details
    const productsWithQuantity = products.map((product) => {
      const cartItem = cartItems.find((item) => item.product_id === product.id);
      return {
        ...product,
        quantity: cartItem ? cartItem.quantity : 0, // Add quantity field
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
