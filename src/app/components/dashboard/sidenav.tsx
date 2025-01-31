import React from "react";
import { Link } from "../../../i18n/routing";
import Image from "next/image";
import NavLinks from "./nav-links";

export default function SideNav(): JSX.Element {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href="/dashboard"
        className="mb-2 flex h-40 justify-center rounded-md bg-[#222e46] p-4 md:h-40"
      >
        <div className="w-32 md:w-40">
          <Image
            src="/assets/images/killer_logo_white-blue.png"
            height={300}
            width={300}
            alt="logo"
          />
        </div>
      </Link>

      <div className="flex grow flex-row justify-start space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
