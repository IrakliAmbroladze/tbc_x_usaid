import { signInAction } from "../../../actions/actions";
import { FormMessage, Message } from "../../../components/form-message";
import { SubmitButton } from "../../../components/submit-button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Link } from "../../../../i18n/routing";
import SignInWithGithub from "./SignInWithGithub";

export default async function Login(props: {
  searchParams: Promise<Message>;
  params: { locale: string };
}) {
  const searchParams = await props.searchParams;
  const { locale } = props.params;
  const langIsKa = locale == "ka";

  return (
    <>
      <form className="flex-1 flex flex-col min-w-64 dark:text-white text-black">
        <h1 className="text-2xl font-medium">
          {langIsKa ? "შესვლა" : "Sign in"}
        </h1>
        <p className="text-sm text-foreground">
          {langIsKa ? "არ გაქვს ანგარიში? " : "Don't have an account? "}

          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            {langIsKa ? "გაიარე რეგისტრაცია" : "Sign up"}
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">{langIsKa ? "ელ. ფოსტა" : "Email"}</Label>
          <Input
            data-cy="sign-in-email"
            name="email"
            placeholder={langIsKa ? "შენი მეილი" : "you@example.com"}
            required
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">{langIsKa ? "პაროლი" : "Password"}</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              {langIsKa ? "დაგავიწყდა პაროლი?" : "Forgot Password?"}
            </Link>
          </div>
          <Input
            data-cy="sign-in-password"
            type="password"
            name="password"
            placeholder={langIsKa ? "შენი პაროლი" : "Your password"}
            required
          />
          <SubmitButton
            pendingText={langIsKa ? "იტვირთება ..." : "Signing In..."}
            formAction={signInAction}
          >
            {langIsKa ? "შესვლა" : "submit"}
          </SubmitButton>
          <FormMessage message={searchParams} />
          <div className="text-center">{langIsKa ? "ან" : "or"}</div>
        </div>
      </form>
      <SignInWithGithub locale={locale} />
    </>
  );
}
