import Image from "next/image";
import { createClient } from "utils/supabase/server";

interface User {
  picture?: string;
  nickname?: string;
  name?: string;
}

export async function AvatarAndName(): Promise<JSX.Element> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <Image
        className="userImg"
        src="/assets/images/avatar.jpg"
        height={2000}
        width={2000}
        alt="User-image"
      />
      <div className="absolute z-30 top-1/4 left-1/4 text-black dark:text-white">
        <h1 className="text-2xl" style={{ marginLeft: "-30px" }}>
          {user.nickname || user.name || ""}
        </h1>
      </div>
    </>
  );
}
