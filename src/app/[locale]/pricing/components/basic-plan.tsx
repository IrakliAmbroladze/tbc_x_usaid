import BtnGlobal from "app/components/small/btn-global";
import { useTranslations } from "next-intl";
import React from "react";
import CheckoutForm from "./CheckoutForm";

export default function BasicPlan() {
  const t = useTranslations("Pricing");

  return (
    <div className="bg-white dark:bg-gray-500 border dark:border-gray-800 rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {t("basic")}
      </h2>
      <p className="mt-4 text-gray-600 dark:text-white">{t("basicBody")}</p>

      <ul className="mt-6 space-y-4 text-gray-600 dark:text-white mb-6">
        <li>✔ {t("basicOption1")}</li>
        <li>✔ {t("basicOption2")}</li>
      </ul>

      <CheckoutForm uiMode="hosted" />
    </div>
  );
}
