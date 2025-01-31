import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    const authHeader = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing auth token" },
        { status: 401 },
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(authHeader);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const { data: invoiceItems, error } = await supabase
      .from("invoices")
      .select("*");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const customerIds = invoiceItems.map((item) => String(item.customer_id));
    const productIds = invoiceItems.map((item) => item.product_id);

    const { data: customers, error: customerError } = await supabase
      .from("customers")
      .select("customer_id, name")
      .in("customer_id", customerIds);

    if (customerError) {
      console.error("Supabase error:", customerError.message);
      return NextResponse.json(
        { error: "Failed to fetch customer details" },
        { status: 500 },
      );
    }

    // Fetch product data
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("id, title_en, price")
      .in("id", productIds);

    if (productError) {
      console.error("Supabase error:", productError.message);
      return NextResponse.json(
        { error: "Failed to fetch product details" },
        { status: 500 },
      );
    }

    const customerMap = customers.reduce(
      (acc, customer) => {
        acc[String(customer.customer_id)] = customer.name; // Ensure customer_id is treated as a string
        return acc;
      },
      {} as Record<string, string>,
    );

    const productMap = products.reduce(
      (acc, product) => {
        acc[product.id] = { title_en: product.title_en, price: product.price };
        return acc;
      },
      {} as Record<number, { title_en: string; price: number }>,
    );

    const combinedInvoiceItems = invoiceItems.map((item) => {
      const customerName =
        customerMap[String(item.customer_id)] || "Unknown Customer"; // Ensure customer_id is treated as a string
      const product = productMap[item.product_id] || {
        title_en: "Unknown Product",
        price: 0,
      };
      return {
        ...item,
        customer_name: customerName,
        product_title_en: product.title_en,
        product_price: product.price,
      };
    });

    return NextResponse.json({ data: combinedInvoiceItems });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
