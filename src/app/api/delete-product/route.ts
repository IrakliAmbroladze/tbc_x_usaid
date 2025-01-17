import { createClient } from "../../../utils/supabase/server";

export async function DELETE(req: Request): Promise<Response> {
  try {
    const { stripe_product_id } = await req.json();
    const supabase = await createClient();

    if (!stripe_product_id) {
      return new Response(JSON.stringify({ error: "Missing product id" }), {
        status: 400,
      });
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("stripe_product_id", stripe_product_id);

    if (error) {
      console.error("Supabase error:", error.message);
      return new Response(
        JSON.stringify({ error: "Failed to delete product" }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      { status: 200 },
    );
  } catch (err: unknown) {
    console.error(
      "Error deleting product:",
      err instanceof Error ? err.message : "Unknown error",
    );
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
