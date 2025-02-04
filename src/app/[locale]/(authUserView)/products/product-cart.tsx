import { Link } from "i18n/routing";
import { lusitana } from "@/ui/fonts";
import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { DeleteProductBtn } from "./cart-buttons";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  locale?: string;
  onDelete: (id: number | string) => void;
}

export default function ProductCard({
  product,
  locale,
  onDelete,
}: ProductCardProps): JSX.Element {
  const title = locale === "ka" ? product.title_ka : product.title_en;

  return (
    <div
      key={product.id}
      className={`${lusitana.className} relative flex flex-col items-center gap-4  dark:text-white text-black `}
    >
      <div className="px-5 bg-white rounded-[45px]">
        <div className="bg-white rounded-[45px] relative group overflow-hidden h-80 flex items-center">
          <Link
            href={`/products/${product.id}`}
            className="overflow-hidden rounded-md "
          >
            <Image
              width={240}
              height={135}
              src={product.image}
              alt={title || "პროდუქტის სურათი"}
              className="w-auto group-hover:scale-110 group-hover:transition-all group-hover:duration-[3000ms] group-hover:ease-in-out"
              priority
              crossOrigin="anonymous"
            />
          </Link>
          <div className="absolute bottom-2 z-10 hidden group-hover:block group-hover:animate-rise0_25s w-full transition-transform duration-150 ease-in-out active:scale-95">
            <AddToCartButton product_id={product.id} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="item-name font-bold">
          {title || "სათაური არ არის ხელმისაწვდომი"}
        </h4>
        <div>{product.price} ₾</div>
      </div>
      <div className="flex gap-2 absolute right-0 mr-3 mt-3">
        <Link
          data-cy={`edit-${product.id}`}
          href={`./products/${product.id}/edit-product`}
          className="px-4 py-2 bg-[#86cd82] text-white rounded-3xl shadow-sm hover:text-black transition-transform duration-150 ease-in-out active:scale-95"
        >
          <FiEdit3 />
        </Link>
        <DeleteProductBtn product_id={product.id} onDelete={onDelete} />
      </div>
    </div>
  );
}
