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

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/dashboard", label: t("dashboard") },
    { href: "/products", label: t("products") },
    { href: "/blog", label: t("blog") },
    { href: "/pricing", label: t("pricing") },
    { href: "/profile", label: t("profile") },
  ];

  return (
    <header className="fixed top-0 z-50 flex h-12 w-full items-center justify-center bg-white bg-opacity-90 shadow-md dark:bg-stone-800 dark:bg-opacity-90 dark:text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <nav className="flex gap-3" aria-label="Main Navigation">
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <HeaderAuth />
          <ThemeToggle />
          <Language />
        </div>
      </div>
    </header>
  );
}
