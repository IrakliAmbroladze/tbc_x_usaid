"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";
import { FiMenu, FiX } from "react-icons/fi";
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
    className="text-black dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400"
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
        className="block md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-12 left-0 w-full shadow-md dark:bg-stone-800 md:static md:block md:shadow-none`}
        aria-label="Main Navigation"
      >
        <ul className="flex flex-col md:flex-row gap-3 p-4 md:p-0 md:gap-3">
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
    </>
  );
}
