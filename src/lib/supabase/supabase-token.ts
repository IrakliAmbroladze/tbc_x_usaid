import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export const supabaseBasedOnToken = async (req: NextRequest) => {
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

  return supabase;
};
