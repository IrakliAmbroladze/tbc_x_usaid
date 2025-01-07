"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.theme
      ? localStorage.theme
      : "system"
  );

  useEffect(() => {
    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.theme = theme;
    }
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  return (
    <div className="flex">
      <select
        className="focus:outline-none appearance-none bg-transparent text-2xl p-1 cursor-pointer dark:bg-stone-800 dark:bg-opacity-90"
        onChange={(e) => setTheme(e.target.value)}
        value={theme}
      >
        <option value="light" className=" dark:text-white text-center">
          ☀︎
        </option>
        <option value="dark" className=" dark:text-white text-center">
          ☽
        </option>
        <option value="system" className=" dark:text-white text-center">
          모
        </option>
      </select>
    </div>
  );
}
