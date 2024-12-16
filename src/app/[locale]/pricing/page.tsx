import React from "react";
import FreePlan from "./components/free-plan";
import BasicPlan from "./components/basic-plan";
import { useTranslations } from "next-intl";

export default function Pricing() {
  const t = useTranslations("Pricing");

  return (
    <>
      <div className="flex items-center flex-col justify-center max-w-[1110px] mx-auto p-6">
        <h1 className="text-4xl font-bold text-center dark:text-white mb-6">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FreePlan />
          <BasicPlan />
        </div>
      </div>
    </>
  );
}
