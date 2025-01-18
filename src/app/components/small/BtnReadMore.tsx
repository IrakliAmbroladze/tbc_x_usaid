import { Link } from "i18n/routing";
import React from "react";

export default function BtnReadMore(): JSX.Element {
  return (
    <Link
      href="/blog"
      style={{
        color: "black",
        textDecoration: "underline overline",
      }}
    >
      Read more
    </Link>
  );
}
