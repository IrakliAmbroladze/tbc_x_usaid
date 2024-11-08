import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from "next/navigation";
import Footer from '../../components/footer/Footer.jsx'


export default async function layout({children}) {
  const session = await getSession();
  const user = session?.user

  if(!user){
    redirect("/");
  }
  return (
    <>
      <main>{children}</main>
      <Footer/>
    </>
  )
}

