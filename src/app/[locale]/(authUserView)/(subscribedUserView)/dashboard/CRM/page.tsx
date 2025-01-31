"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export interface customer {
  id: string | number;
  customer_id: string;
  name: string;
  description: number;
}

const CRM = () => {
  const [customers, setCustomers] = useState<customer[]>([]);
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

        const response = await fetch("/api/dashboard/customers", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart data");
        const { data } = await response.json();

        setCustomers(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [supabase]);

  return (
    <div className="w-[1100px] mx-auto py-10 dark:text-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Customers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{customer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CRM;
