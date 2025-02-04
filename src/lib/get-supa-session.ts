import { createClient } from "@/lib/supabase/client";

export const getSupaSession = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("User is not authenticated");
  }
  return session;
};
