import { NextRequest, NextResponse } from "next/server";
import { supabaseTokenUser } from "@/lib/token-user";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { id, title_ka, body_ka, title_en, body_en } = body;
  if (!id || !title_ka || !body_ka || !title_en || !body_en) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const updates = {
      title_ka,
      body_ka,
      title_en,
      body_en,
    };

    const { data, error } = await (await supabaseTokenUser(req))
      .from("posts")
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
