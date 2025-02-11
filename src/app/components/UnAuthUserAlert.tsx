import React from "react";
import BtnGlobal from "app/components/small/btn-global";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

export default function UnAuthUserAlert(): JSX.Element {
  const t = useTranslations("HomePage");
  const myCookies = cookies();

  const langCookie = myCookies.get("NEXT_LOCALE")?.value || "en";

  return (
    <div className="gap-4 flex flex-1 flex-col justify-center items-center dark:text-white text-black">
      <h2>{t("no_user_message")} </h2>
      <BtnGlobal href={`/${langCookie}/sign-in`} height="4rem" width="10rem">
        {t("login")} ⭬
      </BtnGlobal>
      <h2>
        <Link className="underline" href="/">
          {t("returnHome")}
        </Link>
      </h2>
    </div>
  );
}
