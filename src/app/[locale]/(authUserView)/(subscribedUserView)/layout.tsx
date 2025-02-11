import { Link } from "i18n/routing";
import { createClient } from "../../../../lib/supabase/server";
import { cookies } from "next/headers";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("user_profiles")
    .select("stripe_customer_id")
    .eq("id", user?.id)
    .single();

  const myCookies = cookies();

  const langCookie = myCookies.get("NEXT_LOCALE")?.value || "en";

  return !userData || !userData.stripe_customer_id ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-500 rounded-lg shadow-lg p-8 text-center max-w-md">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {langCookie == "ka"
            ? "მომხარებელი არ არის გამომწერი"
            : "Not subscribed"}
        </p>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {langCookie == "ka" ? "გთხოვთ, მიჰყვეთ ბმულს" : " Please, visit"}
        </h1>
        <Link
          href="/pricing"
          className="text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-600"
        >
          {langCookie == "ka" ? "ფასის გვერდი" : "Pricing Page"}
        </Link>
      </div>
    </div>
  ) : (
    <div>{children}</div>
  );
}
