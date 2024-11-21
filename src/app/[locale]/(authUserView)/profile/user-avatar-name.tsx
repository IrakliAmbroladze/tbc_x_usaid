import React from "react";
import { getSession } from "@auth0/nextjs-auth0";

interface User {
  picture?: string;
  nickname?: string;
  name?: string;
}

export async function AvatarAndName(): Promise<JSX.Element> {
  const session = await getSession();
  const user: User = session?.user || {};

  return (
    <>
      <img
        className="userImg"
        src={user.picture || ""}
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
