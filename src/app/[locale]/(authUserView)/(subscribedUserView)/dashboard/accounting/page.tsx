"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface orderItem {
  id: string | number;
  customer_id: string;
  quantity: number;
  products: {
    price: number;
  };
  delivery_date: string;
  customers: {
    name: string;
  };
  payment: boolean;
}

const AccountingPage = () => {
  const [orders, setOrders] = useState<orderItem[]>([]);
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

        const response = await fetch("/api/dashboard/accounting", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart data");
        const { data } = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [supabase]);

  const updatePayment = async (id: string | number, payment: boolean) => {
    setOrders((prevOrder) =>
      prevOrder.map((order) =>
        order.id === id ? { ...order, payment: payment } : order,
      ),
    );

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`/api/dashboard/accounting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ invoice_id: id, payment: payment }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const OrderItem = ({ order }: { order: orderItem }) => {
    const [isPaid, setIsPaid] = useState(order.payment);

    return (
      <li className="flex gap-10 justify-between items-center p-4 border-b dark:text-white text-black mx-9">
        <div className="flex items-center gap-4">
          <div className="flex text-center flex-col">
            <h2>invoice # {order.id}</h2>
            <h3 className="text-lg font-semibold">id {order.customer_id}</h3>
            <p className="text-gray-600 dark:text-gray-200">
              {order.customers.name}
            </p>
            <h1 className="text-gray-600 dark:text-gray-200 text-3xl mt-2 font-bold">
              {order.quantity * order.products.price} ₾
            </h1>
          </div>
        </div>
        <div className="flex items-end gap-2 flex-col">
          <div className="flex items-center gap-2">
            {isPaid ? (
              <>
                <button
                  onClick={() => {
                    updatePayment(order.id, false);
                    setIsPaid(false);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded-md"
                >
                  Paid
                </button>
              </>
            ) : (
              <>
                <span className="text-lg font-bold">{order.payment}</span>
                <button
                  onClick={() => {
                    updatePayment(order.id, true);
                    setIsPaid(true);
                  }}
                  className="bg-red-300 text-white px-3 py-1 rounded-md"
                >
                  Pending ...
                </button>
              </>
            )}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="py-2 dark:text-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Accounts Receivable{" "}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>Your orders is empty.</p>
      ) : (
        <>
          <ul>
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AccountingPage;
