"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function SortingButtons(): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (order: string): void => {
    const params = new URLSearchParams(searchParams as unknown as Record<string, string>);
    params.set("sortBy", "price");
    params.set("order", order);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <b>price: </b>
      <button onClick={() => handleSort("asc")}>Asc ↓</button>
      <button onClick={() => handleSort("desc")}>Desc ↑</button>
    </div>
  );
}
