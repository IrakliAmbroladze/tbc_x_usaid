import { NextRequest, NextResponse } from "next/server";
import { supabaseTokenUser } from "@/lib/token-user";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { customer_id, product_id, quantity } = body;
  if (!customer_id || !product_id || !quantity) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { data: customer, error: customerError } = await (
    await supabaseTokenUser(req)
  )
    .from("customers")
    .select("customer_id, name")
    .eq("customer_id", customer_id)
    .single();

  if (!customer) {
    return NextResponse.json({ error: "Invalid customer_id" }, { status: 400 });
  }

  if (customerError) {
    console.error(customerError);
  }
  const { data: product, error: productError } = await (
    await supabaseTokenUser(req)
  )
    .from("products")
    .select("id, title_en")
    .eq("id", product_id)
    .single();

  if (!product) {
    return NextResponse.json({ error: "Invalid product_id" }, { status: 400 });
  }
  if (productError) {
    console.error(productError);
  }

  const { data, error } = await (await supabaseTokenUser(req))
    .from("invoices")
    .insert([
      {
        customer_id,
        product_id,
        quantity,
      },
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}
