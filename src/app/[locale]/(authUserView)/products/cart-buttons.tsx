"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { FiEdit3, FiX } from "react-icons/fi";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn("Stripe publishable key is missing.");
}
interface DeleteProductProps {
  product_id: string | number;
  onDelete: (id: number | string) => void;
}

interface BuyProductProps {
  product_id: string | number;
}

export const DeleteProductBtn: React.FC<DeleteProductProps> = ({
  product_id,
  onDelete,
}) => {
  const handleClick = () => {
    onDelete(product_id);
  };

  return (
    <button
      product-id={product_id}
      onClick={handleClick}
      className="px-2 py-2 bg-[#ff686b] text-white hover:text-black rounded-3xl shadow-sm  transition-transform duration-150 ease-in-out active:scale-95"
    >
      <FiX />
    </button>
  );
};

export const EditProductBtn: React.FC<DeleteProductProps> = ({
  product_id,
}) => {
  const handleClick = () => {
    console.log(`"clicked" ${product_id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-[#86cd82] text-white rounded-3xl shadow-sm hover:text-black transition-transform duration-150 ease-in-out active:scale-95"
    >
      <FiEdit3 />
    </button>
  );
};

interface Subscription {
  name: string;
  priceId: string;
  quantity: number;
}

const subscription: Subscription = {
  name: "Product 1",
  priceId: "price_1Qh48zLiYgWQWDVcEOexsUMj",
  quantity: 1,
};

export const BuyProductBtn: React.FC<BuyProductProps> = ({ product_id }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    console.log(product_id);
    setLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [subscription] }),
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
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
    >
      {loading ? "processing" : "Buy now"}
    </button>
  );
};
