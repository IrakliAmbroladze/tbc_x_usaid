"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface AddToCartButtonProps {
  product_id: string | number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product_id,
}) => {
  const [user, setUser] = useState<{ id: string | number } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("Error fetching user:");
        return;
      }
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleClick = async () => {
    if (!user) {
      console.log("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          product_id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
};
