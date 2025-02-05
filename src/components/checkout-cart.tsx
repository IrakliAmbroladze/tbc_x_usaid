"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { cartProduct } from "app/[locale]/(authUserView)/cart/page";
import { createClient } from "@/lib/supabase/client";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn("Stripe publishable key is missing.");
}

const CheckoutCart: React.FC<{ cartProducts: cartProduct[] }> = ({
  cartProducts,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      const { data } = await supabase.auth.getSession();

      if (!data.session?.access_token) {
        throw new Error("User is not authenticated");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const response = await fetch("/api/cart-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({ cartProducts }),
      });

      const session = await response.json();
      if (session.error) {
        console.error(session.error);
        throw new Error(session.error);
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.warn(error.message);
      }
      console.log("clicked");
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="m-2 bg-green-400 hover:bg-green-500 active:bg-green-600 text-white px-4 py-2 rounded-md"
      disabled={loading}
      data-cy="checkoutBtn"
    >
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
};

export default CheckoutCart;
