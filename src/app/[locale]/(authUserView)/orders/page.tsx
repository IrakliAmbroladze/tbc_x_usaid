"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export interface orderProduct {
  id: string | number;
  title_en: string;
  image: string;
  price: number;
  quantity: number;
  stripe_payment_id: string;
  created_at: string;
  description_en?: string; // Added to match usage
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<orderProduct[]>([]);

  const supabase = createClient();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log(session);

        if (!session?.access_token) {
          throw new Error("User is not authenticated");
        }

        const response = await fetch("/api/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch order data");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [supabase]);

  // Fixed grouping logic
  const groupedOrders = orders.reduce<Record<string, orderProduct[]>>(
    (acc, order) => {
      const key = `${order.stripe_payment_id}-${order.created_at.split("T")[0]}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(order);
      return acc;
    },
    {},
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ordered Products</h1>
      {Object.entries(groupedOrders).map(([key, items]) => {
        const [paymentId, date] = key.split("-");
        return (
          <div key={key} className="mb-6 p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Payment ID: {paymentId}</h2>
            <p className="text-gray-600">Date: {date}</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg shadow-md">
                  <Image
                    src={item.image}
                    className="w-300 h-300 object-cover rounded-md"
                    width={240}
                    height={135}
                    alt={item.title_en || "პროდუქტის სურათი"}
                    priority
                    crossOrigin="anonymous"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                    {item.title_en}
                  </h3>
                  {item.description_en && (
                    <p className="text-gray-500">{item.description_en}</p>
                  )}
                  <p className="text-gray-800 font-bold mt-2">
                    Price: ${item.price}
                  </p>
                  <p className="text-gray-700">Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersPage;
