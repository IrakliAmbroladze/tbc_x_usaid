import "./global.css";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

export default function HomePage(): JSX.Element {
  const t = useTranslations("HomePage");
  const langCookie = cookies().get("NEXT_LOCALE")?.value || "en";

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center w-full max-w-[1110px] mx-auto mb-5">
        <div className="flex flex-col bg-[#222e46] w-full h-[30vh] rounded-lg mb-8 p-2 items-center justify-center md:flex-row md:pr-8 md:items-end md:justify-between md:gap-0">
          <Image
            src={"/assets/images/killer_logo_white-blue.png"}
            height={200}
            width={200}
            alt="logo"
          />
          <div className="text-center mb-2 text-white">
            <h1
              className={
                langCookie == "ka"
                  ? "hidden md:block text-6xl"
                  : "hidden md:block md:text-7xl"
              }
            >
              {t("pestService")}
            </h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:flex-row w-full">
          <div className="px-2 text-xl leading-8 rounded-lg w-full md:w-2/5 content-center text-black bg-[#f9fafb] dark:bg-stone-700 dark:text-white">
            <p className="text-center md:text-start mb-5">
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
              className="object-cover rounded-lg"
              src={"/assets/images/welcome-image.jpg"}
              alt="Welcome_Image"
              fill
            />
          </div>
        </div>
      </div>
    </main>
  );
}
