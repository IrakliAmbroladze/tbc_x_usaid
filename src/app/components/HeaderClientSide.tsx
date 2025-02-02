"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { lusitana } from "@/ui/fonts";
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  data_cy?: string;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  href,
  data_cy,
  children,
  onClick,
}) => (
  <Link
    href={href}
    data-cy={data_cy}
    className={`${lusitana.className} text-black dark:text-[#f0eff4] no-underline transition duration-300 p-2 hover:text-[#ffa552] dark:hover:text-[#ffa552] hover:text-shadow `}
    onClick={onClick}
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
    { href: "/cart", label: t("cart") },
    { href: "/orders", label: t("orders") },
    { href: "/profile", label: t("profile") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <button
        className={`${lusitana.className} text-2xl text-stone-900 dark:text-gray-200 flex items-center`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        data-cy="menu"
      >
        Menu
        {menuOpen ? <FiArrowDown /> : <FiArrowUp />}
      </button>
      {menuOpen && (
        <nav
          className={`absolute h-svh top-12 left-0 w-full shadow-md dark:bg-stone-800/20 bg-stone-50/20 backdrop-blur-md text-6xl`}
          aria-label="Main Navigation"
        >
          <ul className="flex flex-col gap-3 p-4 max-w-[1110px] mx-auto">
            {navLinks.map(({ href, label, data_cy }) => (
              <li key={href}>
                <NavLink
                  href={href}
                  data_cy={data_cy}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
