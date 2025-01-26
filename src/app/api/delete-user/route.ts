import { createClient } from "../../../lib/supabase/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const supabase = await createClient();
    const { email, password }: { email: string; password: string } =
      await req.json();

    const { data: session, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) throw signInError;

    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      session.user.id,
    );

    if (deleteError) throw deleteError;

    return new Response(
      JSON.stringify({ success: true, message: "User deleted successfully." }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting user:", error);

    return new Response(JSON.stringify({ success: false, error: error }), {
      status: 400,
    });
  }
}
