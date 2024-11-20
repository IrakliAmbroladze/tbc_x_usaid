import React from "react";
import { getSession } from "@auth0/nextjs-auth0";

interface User {
  email?: string;
}

export async function UserBackground(): Promise<JSX.Element> {
  const session = await getSession();
  const user: User = session?.user || {};

  return (
    <div className="userBackground">
      <button className="editBtn"> Edit</button>
      <div className="userContact">Email: {user.email || "not available"}</div>
    </div>
  );
}
