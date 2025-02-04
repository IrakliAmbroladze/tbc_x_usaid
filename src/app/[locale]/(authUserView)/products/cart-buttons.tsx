"use client";
import { FiX } from "react-icons/fi";

interface ProductProps {
  product_id: string | number;
  onDelete: (id: number | string) => void;
}

export const DeleteProductBtn: React.FC<ProductProps> = ({
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
