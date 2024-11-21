import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WelcomeHeader(): JSX.Element {
  const t = useTranslations("HomePage");

  return (
    <div className="welcomeHeader">
      <Image
        className="welcomeHeaderLogo"
        src={"/assets/images/killer_logo_white-blue.png"}
        height={200}
        width={200}
        alt="logo"
      />
      <h1 className="text-7xl">{t("pestService")}</h1>
    </div>
  );
}
