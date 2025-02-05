"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FiShoppingCart } from "react-icons/fi";

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
      className="w-full p-10 rounded-full flex items-center justify-center bg-[#f0eff4] dark:bg-[#f0eff4] dark:text-black font-bold"
      data-cy="cartBtn"
    >
      <FiShoppingCart />
      <span className="px-2  text-sm">Add to Cart</span>
    </button>
    // <button
    //   onClick={handleClick}
    //   className="h-12 m-2 p-2 rounded-md flex items-center group hover:bg-[#f0eff4] hover:w-full justify-center"
    // >
    //   <FiShoppingCart />
    //   <span className="px-2 hidden group-hover:block text-sm">Add to Cart</span>
    // </button>
  );
};
