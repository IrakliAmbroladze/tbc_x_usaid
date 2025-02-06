import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
  const authHeader = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!authHeader) {
    throw new Error("Missing auth token");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(authHeader);

  if (error || !user) {
    throw new Error("Invalid or expired token");
  }

  try {
    const userId = user.id;

    const { data, error } = await supabase
      .from("users_data")
      .select("*")
      .eq("userId", userId);

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
  const supabase = await createClient();
  const authHeader = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!authHeader) {
    throw new Error("Missing auth token");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(authHeader);

  if (error || !user) {
    throw new Error("Invalid or expired token");
  }
  const body = await req.json();
  if (!body) {
    return NextResponse.json({ error: "Provide user data" }, { status: 400 });
  }

  try {
    const { firstName, lastName, phone, address, city, country } = body;

    const userId = user.id;

    const updates = {
      userId,
      firstName,
      lastName,
      phone,
      address,
      city,
      country,
    };

    const { data, error } = await supabase
      .from("users_data")
      .upsert(updates, { onConflict: "userId" })
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
