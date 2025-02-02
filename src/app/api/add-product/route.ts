import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import Stripe from "stripe";

export async function POST(req: Request): Promise<Response> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia",
  });
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

    const { data, error } = await supabase
      .from("products")
      .insert([
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
      ])
      .select("*");

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
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
