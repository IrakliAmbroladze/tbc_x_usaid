"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";
import { FiMenu, FiX } from "react-icons/fi";
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  data_cy?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ href, data_cy, children }) => (
  <Link
    href={href}
    data-cy={data_cy}
    className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
  >
    {children}
  </Link>
);

export default function HeaderClientSide(): JSX.Element {
  const t = useTranslations("Header");

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/dashboard", label: t("dashboard") },
    { href: "/products", label: t("products"), data_cy: "products-header" },
    { href: "/blog", label: t("blog") },
    { href: "/pricing", label: t("pricing") },
    { href: "/profile", label: t("profile") },
  ];

  return (
    <>
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
          {navLinks.map(({ href, label, data_cy }) => (
            <li key={href}>
              <NavLink href={href} data_cy={data_cy}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
