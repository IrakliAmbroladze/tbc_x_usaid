"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export interface orderItem {
  id: string | number;
  customer_id: string;
  quantity: number;
  plan_date: string;
  delivery_date: string;
  date: string;
  customers: {
    name: string;
  };
  products: {
    title_en: string;
  };
}

const OrderPage = () => {
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

        const response = await fetch("/api/dashboard/orders", {
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

  const updatePlan = async (id: string | number, newPlanDate: string) => {
    setOrders((prevOrder) =>
      prevOrder.map((order) =>
        order.id === id ? { ...order, plan_date: newPlanDate } : order,
      ),
    );

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`/api/dashboard/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ invoice_id: id, plan_date: newPlanDate }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const updateDelivery = async (
    id: string | number,
    newDeliveryDate: string,
  ) => {
    setOrders((prevOrder) =>
      prevOrder.map((order) =>
        order.id === id ? { ...order, delivery_date: newDeliveryDate } : order,
      ),
    );

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`/api/dashboard/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          invoice_id: id,
          delivery_date: newDeliveryDate,
        }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const OrderItem = ({ order }: { order: orderItem }) => {
    const [isEditingPlan, setIsEditingPlan] = useState(false);
    const [isEditingDelivery, setIsEditingDelivery] = useState(false);
    const [newPlanDate, setNewPlanDate] = useState(order.plan_date);
    const [newDeliveryDate, setNewDeliveryDate] = useState(order.delivery_date);

    return (
      <li className="flex justify-between items-center p-4 border-b dark:text-white text-black">
        <div className="flex items-center gap-4 m-6">
          <div>
            <h3 className="text-lg font-semibold">{order.customer_id}</h3>
            <p className="text-gray-600">{order.customers.name}</p>
            <p className="text-gray-600">
              product: <b>{order.products.title_en}</b>
            </p>
            <p className="text-gray-600">
              Qty: x {order.quantity} {"pcs"}
            </p>
          </div>
        </div>
        <div className="flex items-end gap-2 flex-col">
          <div className="flex items-center gap-2">
            {isEditingPlan ? (
              <>
                <input
                  type="date"
                  className="w-285 p-1 border rounded-md"
                  value={newPlanDate}
                  onChange={(e) => setNewPlanDate(e.target.value)}
                />
                <button
                  onClick={() => {
                    updatePlan(order.id, newPlanDate);
                    setIsEditingPlan(false);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded-md"
                >
                  Approve
                </button>
              </>
            ) : (
              <>
                <span className="text-lg font-bold">{order.plan_date}</span>
                <span className="text-lg font-bold">plan date</span>
                <button
                  onClick={() => setIsEditingPlan(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditingDelivery ? (
              <>
                <input
                  type="date"
                  className="w-285 p-1 border rounded-md"
                  value={newDeliveryDate}
                  onChange={(e) => setNewDeliveryDate(e.target.value)}
                />
                <button
                  onClick={() => {
                    updateDelivery(order.id, newDeliveryDate);
                    setIsEditingDelivery(false);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded-md"
                >
                  Approve
                </button>
              </>
            ) : (
              <>
                <span className="text-lg font-bold">{order.delivery_date}</span>
                <span className="text-lg font-bold">Delivery</span>
                <button
                  onClick={() => setIsEditingDelivery(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Edit
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
      <h1 className="text-2xl font-bold mb-4 text-center">Orders</h1>

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

export default OrderPage;
