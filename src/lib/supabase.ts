import { createClient } from "./supabase/client";

export async function getChartData() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("quantity, delivery_date, payment, products(price)")
    .order("date", { ascending: true });

  if (error) throw error;

  const sales = data
    .filter((row) => row.delivery_date !== null)
    .reduce((sum, row) => sum + row.quantity * 270, 0);

  const cashIn = data
    .filter((row) => row.payment === true)
    .reduce((sum, row) => sum + row.quantity * 270, 0);

  return { sales, cashIn };
}
