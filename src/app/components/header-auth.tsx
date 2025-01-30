import { signOutAction } from "../actions/actions";
import { Link } from "../../i18n/routing";
import { Button } from "./ui/button";
import { createClient } from "../../lib/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex dark:text-white text-black items-center gap-4">
      <span className="truncate w-24 block lg:w-auto lg:inline">
        {user.email}
      </span>

      <form action={signOutAction}>
        <Button data-cy="sign-out" type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2 dark:text-white text-black">
      <Button asChild size="sm" variant={"outline"}>
        <Link data-cy="sign-in" href="/sign-in">
          Sign in
        </Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link data-cy="sign-up" href="/sign-up">
          Sign up
        </Link>
      </Button>
    </div>
  );
}
