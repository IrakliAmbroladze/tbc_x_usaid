import { NextRequest, NextResponse } from "next/server";
import { supabaseTokenUser } from "@/lib/token-user";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { id } = body;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const { error } = await (await supabaseTokenUser(req))
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "post is deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
