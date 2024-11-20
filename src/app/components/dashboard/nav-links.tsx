"use client";
import React from "react";
import { Link } from "../../../i18n/routing";
import { usePathname } from "next/navigation";

interface LinkItem {
  name: string;
  href: string;
}

const links: LinkItem[] = [
  { name: "CRM", href: "/dashboard/crm" },
  { name: "Sales", href: "/dashboard/sales" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Accounting", href: "/dashboard/accounting" },
  { name: "Reports", href: "/dashboard/reports" },
];

export default function NavLinks(): JSX.Element {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <p className="hidden md:block">{link.name}</p>
        </Link>
      ))}
    </>
  );
}
