"use client";

interface DeleteProductProps {
  product_id: string | number;
  onDelete: (id: number | string) => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({
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
      className="px-4 py-2 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
    >
      Delete
    </button>
  );
};

export default DeleteProduct;
