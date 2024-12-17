"use client";
import BtnGlobal from "app/components/small/btn-global";
import { useTranslations } from "next-intl";
import React from "react";

export default function FreePlan() {
  const t = useTranslations("Pricing");

  const formAction = async () => {
    alert(`${t("alert")}`);
  };

  return (
    <form
      action={formAction}
      className="bg-white dark:bg-gray-500 border dark:border-gray-800 rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {t("free")}
      </h2>
      <p className="mt-4 text-gray-600 dark:text-white">{t("freeBody")}</p>

      <ul className="mt-6 space-y-4 text-gray-600 dark:text-white mb-6">
        <li>✔ {t("freeOption1")}</li>
        <li>✔ {t("freeOption2")}</li>
      </ul>
      <button
        type="submit"
        className="mt-8 w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
      >
        {t("select")} {t("free")}
      </button>
    </form>
  );
}
