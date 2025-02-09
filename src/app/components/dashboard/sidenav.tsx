import React from "react";
import { Link } from "../../../i18n/routing";
import Image from "next/image";
import NavLinks from "./nav-links";

export default function SideNav(): JSX.Element {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className=" cursor-pointer mb-2 flex h-40 justify-center rounded-md bg-[#222e46] p-4 items-center">
        <Link href="/dashboard">
          <Image
            src="/assets/images/logoWhite.png"
            height={450}
            width={450}
            alt="logo"
            className="h-28 w-auto"
          />
        </Link>
      </div>

      <div
        className="flex
      grow
      flex-row
      justify-start
      space-x-2
      md:flex-col
      md:space-x-0
      md:space-y-2"
      >
        <NavLinks />
      </div>
    </div>
  );
}
