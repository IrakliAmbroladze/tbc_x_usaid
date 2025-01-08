import { createClient } from "utils/supabase/server";

interface User {
  email?: string;
}

export async function UserBackground(): Promise<JSX.Element> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="userBackground">
      <button className="editBtn"> Edit</button>
      <div className="userContact">Email: {user.email || "not available"}</div>
    </div>
  );
}
