import { NextResponse } from "next/server";
import { stripe } from "app/lib/stripe";

interface RequestBody {
  sessionId: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { sessionId }: RequestBody = await req.json();

    if (!sessionId) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
