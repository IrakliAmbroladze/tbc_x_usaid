import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  [key: string]: any; // Extend with additional fields as necessary
}

async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  try {
    console.log(`Fetching product with id: ${id}`);
    const product = await fetchProduct(id);

    if (!product) {
      console.error(`Product not found with id: ${id}`);
      return new Response("Product not found", { status: 404 });
    }

    console.log(`Fetched product: ${JSON.stringify(product)}`);

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response("Error fetching product", { status: 500 });
  }
}
