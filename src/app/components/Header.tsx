"use client";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";
import Language from "./language";
import HeaderAuth from "./header-auth";
import { FiMenu, FiX } from "react-icons/fi";
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

  const [menuOpen, setMenuOpen] = useState(false);

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
        <button
          className="block md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-12 left-0 w-full bg-white shadow-md dark:bg-stone-800 md:static md:block md:shadow-none`}
          aria-label="Main Navigation"
        >
          <ul className="flex flex-col md:flex-row gap-3 p-4 md:p-0 md:gap-3">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href}>{label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* <HeaderAuth /> */}
          <ThemeToggle />
          <Language />
        </div>
      </div>
    </header>
  );
}
