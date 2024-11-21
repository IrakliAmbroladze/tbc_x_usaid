import React from "react";
import Link from "next/link";
import "./btn-global.css";

interface BtnGlobalProps {
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
  href: string;
}

export default function BtnGlobal({ children, height, width, href }: BtnGlobalProps): JSX.Element {
  return (
    <Link href={href}>
      <button className="btnGlobal" style={{ height, width }}>
        {children}
      </button>
    </Link>
  );
}
