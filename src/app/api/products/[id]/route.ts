import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchProduct(id) {
  try {
    // Query Supabase to fetch the product by ID
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
    throw error;
  }
}

export async function GET(req, { params }) {
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
