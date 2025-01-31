import { supabaseBasedOnToken } from "@/lib/supabase/supabase-token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { data, error } = await (await supabaseBasedOnToken(req))
      .from("invoices")
      .select("*")
      .order("delivery_date", { ascending: true, nullsFirst: true })
      .order("plan_date", { ascending: true, nullsFirst: true })
      .order("date", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 401 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { invoice_id, plan_date, delivery_date } = body;

  if (
    !invoice_id ||
    (plan_date === undefined && delivery_date === undefined) ||
    (plan_date !== undefined && delivery_date !== undefined)
  ) {
    return NextResponse.json(
      {
        error:
          "Provide invoice_id and exactly one of plan_date or delivery_date",
      },
      { status: 400 },
    );
  }

  try {
    const updates = plan_date !== undefined ? { plan_date } : { delivery_date };

    const { data, error } = await (await supabaseBasedOnToken(req))
      .from("invoices")
      .update(updates)
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
