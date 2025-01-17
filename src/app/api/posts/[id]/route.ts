import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface post {
  id: number;
  title_en: string;
  title_ka: string;
  body_en: string;
  body_ka: string;
  tags: string[];
  body: string;
  title: string;
  views: string;
}
async function fetchpost(id: string): Promise<post | null> {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_KEY!;
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
): Promise<Response> {
  const { id } = params;

  try {
    const post = await fetchpost(id);

    if (!post) {
      console.error(`post not found with id: ${id}`);
      return new Response("post not found", { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response("Error fetching post", { status: 500 });
  }
}
