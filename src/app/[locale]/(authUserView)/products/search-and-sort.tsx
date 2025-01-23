"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SortingButtons() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (order: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", "price");
    params.set("order", order);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="inline-block">
      <div>
        <b>price: </b>
        <button onClick={() => handleSort("asc")}>Asc ↑</button>
        <button onClick={() => handleSort("desc")}>Desc ↓</button>
      </div>
    </div>
  );
}

export function Search(): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>,
    );
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <input
      className="bg-stone-100 placeholder-slate-900 w-full sm:w-96 md:w-[500px] px-4 py-2 rounded-lg"
      placeholder="search"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("query") ?? ""}
    />
  );
}
