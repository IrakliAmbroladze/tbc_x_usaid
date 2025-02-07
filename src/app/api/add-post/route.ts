import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { title_ka, body_ka, title_en, body_en } = body;

    if (!title_ka || !body_ka || !title_en || !body_en) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title_ka, body_ka, title_en, body_en }])
      .select();

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json(
        { error: "Failed to add post to Supabase" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Post added successfully",
        post: data,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
