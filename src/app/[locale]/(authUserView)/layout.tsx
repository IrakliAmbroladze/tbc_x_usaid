import { getSession } from '@auth0/nextjs-auth0';
import UnAuthUserAlert from '../../components/UnAuthUserAlert';
import AuthUserView from '../../components/AuthUserView';

export default async function layout({children}) {
  const session = await getSession();
  const user = session?.user
 
  return user ? <AuthUserView children={children}/> : <UnAuthUserAlert />
}

