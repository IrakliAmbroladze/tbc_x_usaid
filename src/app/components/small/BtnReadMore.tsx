import React from "react";

export default function BtnReadMore(): JSX.Element {
  return (
    <a
      href="/blog"
      style={{
        color: "black",
        textDecoration: "underline overline",
      }}
    >
      Read more
    </a>
  );
}
