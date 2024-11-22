import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";
import Language from "./language";

export default function Header(): JSX.Element {
  const t = useTranslations("Header");

  return (
    <header className="text-center shadow-md h-12 fixed top-0 w-full z-50 flex justify-center items-center dark:text-white bg-white dark:bg-stone-800 bg-opacity-[92%] dark:bg-opacity-[92%]">
      <nav className="flex justify-center flex-wrap gap-3 m-10">
        <Link
          href="/"
          className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
        >
          {t("home")}
        </Link>
        <Link
          href="/dashboard"
          className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
        >
          {t("dashboard")}
        </Link>
        {/* <Link href="/assignment-3" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">{t("assignment 3")}</Link> */}
        <Link
          href="/profile"
          className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
        >
          {t("profile")}
        </Link>
        <Link
          href="/products"
          className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
        >
          {t("products")}
        </Link>
        <Link
          href="/blog"
          className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
        >
          {t("blog")}
        </Link>
        <Link
          href="/contact"
          className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
        >
          {t("contact")}
        </Link>
        <Link
          href="/about"
          className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
        >
          {t("about")}
        </Link>
        <a
          href="/api/auth/logout"
          className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
        >
          {t("logout")}
        </a>
      </nav>
      <ThemeToggle />
      <Language />
    </header>
  );
}
