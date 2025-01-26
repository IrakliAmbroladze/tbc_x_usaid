import { useState } from "react";
import Image from "next/image";

interface CartItemProps {
  product: {
    id: string | number;
    title_en: string;
    image: string;
    price: number;
    quantity: number;
  };
  updateQuantity: (id: string | number, quantity: number) => void;
  removeItem: (id: string | number) => void;
}

const CartItem = ({ product, updateQuantity, removeItem }: CartItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(product.quantity);

  return (
    <li className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-4">
        <Image
          src={product.image}
          className="w-20 h-20 object-cover rounded-md"
          width={240}
          height={135}
          alt={product.title_en || "პროდუქტის სურათი"}
          priority
          crossOrigin="anonymous"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.title_en}</h3>
          <p className="text-gray-600">
            {product.price} ₾ x {product.quantity}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <input
              type="number"
              className="w-16 p-1 border rounded-md"
              value={newQuantity}
              onChange={(e) =>
                setNewQuantity(parseInt(e.target.value, 10) || 1)
              }
              min="1"
            />
            <button
              onClick={() => {
                updateQuantity(product.id, newQuantity);
                setIsEditing(false);
              }}
              className="bg-green-500 text-white px-3 py-1 rounded-md"
            >
              Approve
            </button>
          </>
        ) : (
          <>
            <span className="text-lg font-bold">{product.quantity}</span>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Edit
            </button>
          </>
        )}
        <button
          onClick={() => removeItem(product.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
