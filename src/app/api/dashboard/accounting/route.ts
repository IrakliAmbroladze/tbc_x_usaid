import { supabaseTokenUser } from "@/lib/token-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { data, error } = await (await supabaseTokenUser(req))
      .from("invoices")
      .select(
        "id, customer_id, delivery_date, customers(name), quantity, products(price), payment",
      )
      .not("delivery_date", "is", null)
      .order("delivery_date", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { invoice_id, payment } = body;

  if (!invoice_id || payment === undefined) {
    return NextResponse.json(
      {
        error: "Provide invoice_id and payment",
      },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await (await supabaseTokenUser(req))
      .from("invoices")
      .update({ payment })
      .eq("id", invoice_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
