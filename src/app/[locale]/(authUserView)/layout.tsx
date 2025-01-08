import { createClient } from "../../../utils/supabase/server";
import UnAuthUserAlert from "../../components/UnAuthUserAlert";
import AuthUserView from "../../components/AuthUserView";

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

  return user ? <AuthUserView>{children}</AuthUserView> : <UnAuthUserAlert />;
}
