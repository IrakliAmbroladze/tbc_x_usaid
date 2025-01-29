import { createClient } from "@/lib/supabase/server";

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
  const supabase = await createClient();

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
