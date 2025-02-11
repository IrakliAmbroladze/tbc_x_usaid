import { signUpAction } from "../../../actions/actions";
import { SubmitButton } from "../../../components/submit-button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Link } from "../../../../i18n/routing";

export default async function Signup({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const langIsKa = locale == "ka";
  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto dark:text-white text-black">
        <h1 className="text-2xl font-medium">
          {langIsKa ? "რეგისტრაცია" : "Sign up"}
        </h1>
        <p className="text-sm text text-foreground">
          {langIsKa ? "გაქვს ანგარიში? " : "Already have an account? "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            {langIsKa ? "შესვლა" : "Sign in"}
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">{langIsKa ? "ელ. ფოსტა" : "Email"}</Label>
          <Input
            data-cy="sign-up-email"
            name="email"
            placeholder={langIsKa ? "შენი მეილი" : "you@example.com"}
            required
          />
          <Label htmlFor="password">{langIsKa ? "პაროლი" : "Password"}</Label>
          <Input
            data-cy="sign-up-password"
            type="password"
            name="password"
            placeholder={langIsKa ? "შენი პაროლი" : "Your password"}
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            {langIsKa ? "რეგისტრაცია" : "Sign up"}
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
