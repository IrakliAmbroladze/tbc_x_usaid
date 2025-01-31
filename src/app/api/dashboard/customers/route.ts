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

    const { data, error } = await supabase.from("customers").select("*");
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
