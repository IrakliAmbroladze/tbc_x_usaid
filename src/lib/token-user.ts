import { NextRequest } from "next/server";
import { supabase } from "./supabaseClient";

export const supabaseTokenUser = async (req: NextRequest) => {
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
