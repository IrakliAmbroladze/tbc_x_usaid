import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import Image from "next/image";

interface cartProduct {
  id: string | number;
  title_ka: string;
  title_en: string;
  image: string;
  description_ka: string;
  description_en: string;
  price: number;
  quantity: number;
}

const CartPage = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const host = headers().get("host");
  const cartURL =
    host === "localhost:3000"
      ? `http://${host}/api/cart`
      : `https://${host}/api/cart`;

  let cart = [];
  try {
    const response = await fetch(cartURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }

    cart = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="w-[1100px] mx-auto">
      <div className="py-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((product: cartProduct) => (
                <li
                  key={product.id}
                  className="flex flex-col justify-between p-4 border-b"
                >
                  <div
                    key={product.id}
                    className="flex items-center gap-4 mt-1 border border-r-stone-200 p-2 rounded-xl"
                  >
                    <Image
                      width={240}
                      height={135}
                      src={product.image}
                      alt={product.title_en || "პროდუქტის სურათი"}
                      className="rounded-md w-auto h-auto"
                      priority
                      crossOrigin="anonymous"
                    />
                    <div className="flex flex-col">
                      <span>Product ID: {product.id}</span>
                      <span>Quantity: {product.quantity}</span>
                      <h4 className="item-name ">
                        {product.title_en || "სათაური არ არის ხელმისაწვდომი"}
                      </h4>
                      <div>{product.price} ₾</div>
                      <p className="text-[0.9rem] line-clamp-1">
                        {product.description_en ||
                          "აღწერა არ არის ხელმისაწვდომი"}
                      </p>
                      <div className="flex gap-2">
                        <button className="text-red-500">Remove</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
