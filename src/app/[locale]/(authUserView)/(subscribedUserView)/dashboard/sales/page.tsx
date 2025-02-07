"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Link } from "i18n/routing";

type OrderData = {
  id: number;
  customer_id: string;
  product_id: number;
  quantity: number;
  date: string;
  customer_name: string;
  product_title_en: string;
  product_price: number;
};

const Invoices = () => {
  const [invoices, setInvoices] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          throw new Error("User is not authenticated");
        }

        const response = await fetch("/api/dashboard/invoices", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart data");
        const { data } = await response.json();

        setInvoices(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [supabase]);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link href={"./sales/create-invoice"}> create-invoice </Link>
      <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">
        Invoice List
      </h1>
      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      ) : invoices.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          No invoices found.
        </p>
      ) : (
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden text-black">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700">
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Customer Name</th>
              <th className="px-6 py-3 font-medium">Product Title</th>
              <th className="px-6 py-3 font-medium">Quantity</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.customer_name}</td>
                <td className="px-6 py-4 text-sm">{order.product_title_en}</td>
                <td className="px-6 py-4 text-sm">{order.quantity}</td>
                <td className="px-6 py-4 text-sm">{order.product_price} GEL</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(order.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Invoices;
