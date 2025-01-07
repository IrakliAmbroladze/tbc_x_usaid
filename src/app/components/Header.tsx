import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";
import Language from "./language";
import HeaderAuth from "./header-auth";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
  >
    {children}
  </Link>
);

export default function Header(): JSX.Element {
  const t = useTranslations("Header");

  return (
    <header className="text-center shadow-md h-12 fixed top-0 w-full z-50 flex justify-center items-center dark:text-white bg-white dark:bg-stone-800 bg-opacity-[92%] dark:bg-opacity-[92%]">
      <nav className="flex justify-center flex-wrap gap-3 m-10">
        <NavLink href="/">{t("home")}</NavLink>
        <NavLink href="/dashboard">{t("dashboard")}</NavLink>
        <NavLink href="/profile">{t("profile")}</NavLink>
        <NavLink href="/products">{t("products")}</NavLink>
        <NavLink href="/blog">{t("blog")}</NavLink>
        <NavLink href="/pricing">{t("pricing")}</NavLink>
        <HeaderAuth />
      </nav>
      <ThemeToggle />
      <Language />
    </header>
  );
}
