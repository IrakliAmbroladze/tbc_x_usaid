"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search(): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams as unknown as Record<string, string>);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <input
      className="bg-stone-100 placeholder-slate-900"
      placeholder="search"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("query") ?? ""}
    />
  );
}
