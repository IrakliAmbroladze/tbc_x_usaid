import "./global.css";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import { lusitana } from "@/ui/fonts";

export default function HomePage(): JSX.Element {
  const t = useTranslations("HomePage");
  const langCookie = cookies().get("NEXT_LOCALE")?.value || "en";

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center w-full max-w-[1110px] mx-auto mb-5">
        <div className="flex flex-col bg-[#222e46] w-full rounded-lg mb-1 md:mb-8 p-1 md:p-2 items-center justify-center md:flex-row md:pr-8 md:items-end md:justify-between md:gap-0">
          <Image
            src="/assets/images/killer_logo_white-blue.png"
            height={892}
            width={1177}
            alt="logo"
            priority
            className="w-64 my-5"
          />
          <div className="text-center mb-2 text-white">
            <h1
              className={`${
                langCookie == "ka"
                  ? "hidden md:block text-6xl"
                  : "hidden md:block md:text-8xl"
              } ${lusitana.className}`}
            >
              {t("pestService")}
            </h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:flex-row w-full">
          <div className="px-2 text-xl leading-8 rounded-lg w-full md:w-2/5 content-center text-black bg-stone-50 dark:bg-stone-700 dark:text-white mb-1">
            <p
              className={`${lusitana.className} text-center md:text-start p-2 text-stone-950 dark:text-stone-200`}
            >
              <strong>Welcome to Killers. </strong>
              <span>This is a pest service company to help you in making </span>
              <strong>disinfection, </strong>
              <strong>disinsection </strong>
              <span>and </span>
              <strong>deratization</strong> procedures.
            </p>
          </div>
          <div className="flex-1 relative">
            <Image
              className="object-cover rounded-lg h-auto"
              src={"/assets/images/welcome-image.jpg"}
              alt="Welcome_Image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
