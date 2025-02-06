import { signOutAction } from "../actions/actions";
import { Link } from "../../i18n/routing";
import { Button } from "./ui/button";
import { createClient } from "../../lib/supabase/server";
import { PowerIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/ui/fonts";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div
      className={`${lusitana.className} flex dark:text-white text-black items-center gap-4`}
    >
      <Link href={"/profile"} className="hidden sm:w-auto sm:inline">
        {user?.user_metadata?.user_name || user.email}
      </Link>

      <form action={signOutAction}>
        <Button data-cy="sign-out" type="submit" variant={"outline"}>
          <PowerIcon className="w-4 md:hidden" />
          <span className="hidden md:block">sign out</span>
        </Button>
      </form>
    </div>
  ) : (
    <div
      className={`${lusitana.className} flex gap-2 dark:text-white text-black`}
    >
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
