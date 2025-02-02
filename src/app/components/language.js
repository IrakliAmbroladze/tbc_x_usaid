"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { lusitana } from "@/ui/fonts.ts";

export default function Language() {
  const t = useTranslations("Language");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (nextLocale) => {
    startTransition(() => {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/${localActive}`, `/${nextLocale}`);
      router.replace(newPath);
    });
  };

  return (
    <div className="m-2 dark:text-white text-black">
      <p className="sr-only">Change language</p>
      <button
        onClick={() => onSelectChange(localActive === "en" ? "ka" : "en")}
        className={`${lusitana.className} focus:outline-none bg-transparent text-xs p-1 cursor-pointer dark:bg-stone-800 dark:bg-opacity-90`}
        disabled={isPending}
      >
        {localActive === "en" ? t("english") : t("georgian")}
      </button>
    </div>
  );
}
