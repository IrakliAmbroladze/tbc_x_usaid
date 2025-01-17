import { stripe } from "../../lib/stripe";
import { createClient } from "../../../utils/supabase/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const {
      title_ka,
      description_ka,
      price,
      image,
      category_ka,
      category_en,
      title_en,
      description_en,
    } = body;

    if (
      !title_ka ||
      !description_ka ||
      !price ||
      !image ||
      !category_ka ||
      !category_en ||
      !title_en ||
      !description_en
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    if (price <= 0) {
      return new Response(
        JSON.stringify({ error: "Price must be a positive number" }),
        { status: 400 },
      );
    }

    const stripeProduct = await stripe.products.create({
      name: title_en,
      description: description_en,
      metadata: {
        title_ka,
        description_ka,
        price: price.toString(),
        image,
        category_ka,
        category_en,
      },
    });

    const stripePrice = await stripe.prices.create({
      unit_amount: price,
      currency: "usd",
      product: stripeProduct.id,
    });

    const { data, error } = await supabase.from("products").insert([
      {
        title_ka,
        description_ka,
        price,
        image,
        category_ka,
        category_en,
        title_en,
        description_en,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error.message);
      return new Response(
        JSON.stringify({ error: "Failed to add product to Supabase" }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Product added successfully",
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
