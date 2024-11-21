import React from "react";
import Image from "next/image";

export default function Page(): JSX.Element {
  return (
    <Image
      alt="dashboard image"
      height={2000}
      width={2000}
      className="w-auto h-full object-contain"
      src="https://images.klipfolio.com/website/public/4d789bf2-a6d2-45ea-87e7-38e131f9d354/sales%20dashboard.png"
    />
  );
}
