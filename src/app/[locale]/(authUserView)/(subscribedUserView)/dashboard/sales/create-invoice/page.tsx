"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Link } from "i18n/routing";

const supabase = createClient();

export default function CreateInvoice() {
  const [customers, setCustomers] = useState<
    { customer_id: number; name: string }[]
  >([]);
  const [products, setProducts] = useState<{ id: number; title_en: string }[]>(
    [],
  );
  const [customerID, setCustomerID] = useState<number | null>(null);
  const [productID, setProductID] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const { data: customersData } = await supabase
        .from("customers")
        .select("customer_id, name");
      const { data: productsData } = await supabase
        .from("products")
        .select("id, title_en");

      if (customersData) setCustomers(customersData);
      if (productsData) setProducts(productsData);
    }

    fetchData();
  }, []);

  const handleCustomerChange = (id: number) => {
    setCustomerID(id);
  };

  const handleProductChange = (id: number) => {
    setProductID(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerID || !productID) {
      alert("Please select a valid customer and product.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("User is not authenticated");
    }

    const response = await fetch("/api/dashboard/create-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        customer_id: customerID,
        product_id: productID,
        quantity,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Invoice created successfully!");
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <Link href={"./"} className="text-black">
        {" "}
        back to sales{" "}
      </Link>

      <h2 className="text-xl text-black font-bold mb-4">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Customer</span>
          <select
            value={customerID ?? ""}
            onChange={(e) => handleCustomerChange(Number(e.target.value))}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="" disabled>
              Select Customer
            </option>
            {customers.map((c) => (
              <option key={c.customer_id} value={c.customer_id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <input
          type="text"
          value={customerID ?? ""}
          readOnly
          className="text-black block w-full mt-1 p-2 border rounded bg-gray-100"
        />

        <label className="block">
          <span className="text-gray-700">Product</span>
          <select
            value={productID ?? ""}
            onChange={(e) => handleProductChange(Number(e.target.value))}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="" disabled>
              Select Product
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title_en}
              </option>
            ))}
          </select>
        </label>
        <input
          type="text"
          value={productID ?? ""}
          readOnly
          className="text-black block w-full mt-1 p-2 border rounded bg-gray-100"
        />

        <label className="block">
          <span className="text-gray-700">Quantity</span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="block w-full mt-1 p-2 border rounded"
            min="1"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
}
