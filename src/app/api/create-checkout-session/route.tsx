import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stripe } from "app/lib/stripe";

export async function POST(req: Request): Promise<Response> {
  try {
    const {
      items,
    }: { items: { name: string; price: number; quantity: number }[] } =
      await req.json();

    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "GEL",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Prices in cents
      },
      quantity: item.quantity,
    }));

    const myCookies = cookies();
    const langCookie = myCookies.get("NEXT_LOCALE")?.value || "en";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/${langCookie}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/${langCookie}/pricing`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
