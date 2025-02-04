import { NextRequest, NextResponse } from "next/server";
import { supabaseTokenUser } from "@/lib/token-user";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const {
    id,
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
    !id ||
    !title_ka ||
    !description_ka ||
    !price ||
    !image ||
    !category_ka ||
    !category_en ||
    !title_en ||
    !description_en
  ) {
    return NextResponse.json(
      {
        error: "Provide product details",
      },
      { status: 400 },
    );
  }

  try {
    const updates = {
      title_ka,
      description_ka,
      price,
      image,
      category_ka,
      category_en,
      title_en,
      description_en,
    };

    const { data, error } = await (await supabaseTokenUser(req))
      .from("products")
      .update(updates)
      .eq("id", id)
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
