"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function SortingButtons() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSort = (order) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', "price");
    params.set('order', order);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <b>price: </b> 
      <button onClick={() =>handleSort("asc")}>Asc ↓</button>
      <button onClick={() =>handleSort("desc")}>Desc ↑</button>
    </div>
  )
}

