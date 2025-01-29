import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }

  let event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const supabase = await createClient();
    const user_id = session.metadata?.user_id;

    if (session.mode === "payment") {
      const { data: cartData, error: cartError } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user_id);

      if (cartError) {
        console.error("Error fetching cart data:", cartError);
        return;
      }

      const { error: ordersError } = await supabase.from("orders").upsert(
        cartData.map((item) => ({
          user_id: item.user_id,
          product_id: item.product_id,
          quantity: item.quantity,
          stripe_payment_id: session.payment_intent,
        })),
      );

      if (ordersError) {
        console.error("Error moving cart data to orders:", ordersError);
        return;
      }

      const { error: deleteError } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user_id);

      if (deleteError) {
        console.error("Error deleting cart data:", deleteError);
        return;
      }

      console.log("Cart data moved to orders and deleted from cart.");
    } else if (session.mode === "subscription") {
      console.log("suuuuuuuuuuuuuuuuuuuuubscription");
    }
  }

  return NextResponse.json({ received: true });
}
