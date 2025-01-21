import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// import { stripe } from "app/lib/stripe";
import { createClient } from "../../../utils/supabase/server";
import Stripe from "stripe";

export async function POST(req: Request): Promise<Response> {
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
      items,
    }: { items: { name: string; priceId: string; quantity: number }[] } =
      await req.json();

    const transformedItems = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    const myCookies = cookies();
    const langCookie = myCookies.get("NEXT_LOCALE")?.value || "en";
    const host = req.headers.get("host");
    const getBaseUrl = () => {
      if (
        process.env.NEXT_PUBLIC_URL &&
        `https://${host}` === process.env.NEXT_PUBLIC_URL
      ) {
        return process.env.NEXT_PUBLIC_URL;
      }

      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      return "http://localhost:3000";
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "subscription",
      customer: customer.id,
      success_url: `${getBaseUrl()}/${langCookie}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/${langCookie}/pricing`,
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
