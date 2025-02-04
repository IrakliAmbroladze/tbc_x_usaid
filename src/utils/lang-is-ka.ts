import { cookies } from "next/headers";

export const langIsKa = () => {
  return cookies().get("NEXT_LOCALE")?.value == "ka" ? true : false;
};
