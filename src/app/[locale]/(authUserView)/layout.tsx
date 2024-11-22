import { getSession, Session } from "@auth0/nextjs-auth0";
import UnAuthUserAlert from "../../components/UnAuthUserAlert";
import AuthUserView from "../../components/AuthUserView";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const session: Session | null | undefined = await getSession();
  const user = session?.user;

  return user ? <AuthUserView>{children}</AuthUserView> : <UnAuthUserAlert />;
}
