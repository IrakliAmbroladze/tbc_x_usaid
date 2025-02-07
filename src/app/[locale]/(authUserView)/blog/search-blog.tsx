"use client";
import { lusitana } from "@/ui/fonts";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export function Search(): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setQuery(params.get("query") || "");
  }, [searchParams]);

  const clearSearch = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="my-2 relative w-full">
      <input
        className={`bg-stone-100 dark:bg-stone-500 text-stone-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-200 w-full px-4 py-2 rounded-lg pr-10 ${lusitana.className}`}
        placeholder="search"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          handleSearch(value);
        }}
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:text-gray-200 dark:hover:text-blue-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}
