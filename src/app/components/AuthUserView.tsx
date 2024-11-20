import React from "react";
import Footer from "./footer/Footer";

interface AuthUserViewProps {
  children: React.ReactNode;
}

export default function AuthUserView({ children }: AuthUserViewProps): JSX.Element {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
