import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../../lib/supabase/server";
import Stripe from "stripe";
import { getBaseUrl } from "@/utils/url";

export async function POST(req: NextRequest): Promise<Response> {
  const supabase = await createClient();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia",
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const customer = await stripe.customers.create({
    email: user?.email,
  });

  try {
    const {
      cartProducts,
    }: {
      cartProducts: {
        id?: number;
        title_en: string;
        image: string;
        price: number;
        quantity: number;
      }[];
    } = await req.json();

    const transformedItems = cartProducts.map((item) => ({
      price_data: {
        currency: "gel",
        product_data: {
          name: item.title_en,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const myCookies = cookies();
    const langCookie = myCookies.get("NEXT_LOCALE")?.value || "en";
    const url = getBaseUrl(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      customer: customer.id,
      success_url: `${url}/${langCookie}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/${langCookie}/cart`,
      metadata: {
        user_id: String(user?.id),
      },
    });

    const { error } = await supabase
      .from("user_profiles")
      .upsert({ id: user?.id, stripe_customer_id: customer.id });

    if (error) {
      throw new Error("Failed to update user profile with Stripe customer ID");
    }

    return NextResponse.json({ id: session.id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
