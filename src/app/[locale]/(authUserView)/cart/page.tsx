"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import CartItem from "./CartItem";
import CheckoutCart from "@/components/checkout-cart";

export interface cartProduct {
  id: string | number;
  title_en: string;
  image: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<cartProduct[]>([]);
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

        const response = await fetch("/api/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart data");
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [supabase]);

  const updateQuantity = async (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`/api/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ product_id: id, quantity: newQuantity }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id: string | number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`/api/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ product_id: id }),
      });

      if (!response.ok) throw new Error("Failed to remove item");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async () => {
    setCart([]);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(`/api/clear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to clear cart");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  return (
    <div className="w-[1100px] mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <span className="text-xl font-bold mb-4 text-green-700">
            Total amount: {total} ₾
          </span>
          <ul>
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </ul>
          <CheckoutCart cartProducts={cart} />
          <button
            onClick={clearCart}
            className="m-2 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
