import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbhoxdzzhvcuajscuqes.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async () => {
  try {
    let { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }


    if (!Array.isArray(products)) {
      return new Response(JSON.stringify({ error: "არ არის მასივი" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    products = products.map((product) => {
      return {
        ...product,
        title: product.title.replace(/\n/g, ''),
        description: product.description.replace(/\n/g, ''),
      };
    });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
