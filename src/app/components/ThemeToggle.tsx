"use client";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={1}
        height={1}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );

  return (
    <div className="relative dark:text-white text-black">
      <button
        className="p-2 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-800 flex items-center gap-2"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {theme === "system" ? (
          <FiMonitor />
        ) : resolvedTheme === "dark" ? (
          <FiMoon />
        ) : (
          <FiSun />
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-300 rounded-md shadow-lg">
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              setTheme("light");
              setDropdownOpen(false);
            }}
          >
            <FiSun /> Light Mode
          </button>
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              setTheme("dark");
              setDropdownOpen(false);
            }}
          >
            <FiMoon /> Dark Mode
          </button>
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              setTheme("system");
              setDropdownOpen(false);
            }}
          >
            <FiMonitor /> System Mode
          </button>
        </div>
      )}
    </div>
  );
}
