'use client'
// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
import { UserProfile } from "./user-profile";
import { ThemeContext, AuthContext } from './context';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from "next/navigation";


import {user} from './context'

import "./index.css"


export default async function Profile (){
    const session = await getSession();
  const authUser = session?.user

  if(!authUser){
    redirect("/")
  }
    
    return (
        <div className="page-wrapper">
            {/* <Header /> */}
            
            <AuthContext.Provider value={user}>
                {/* <div>${user}</div> */}
                <UserProfile />
                </AuthContext.Provider>
                {/* <Footer /> */}
         
        </div>

    )
}


// import { getSession } from '@auth0/nextjs-auth0';

// export default async function ProfileServer() {
//   const { user } = await getSession();

//   return (
//       user && (
//           <div>
//             <img src={user.picture} alt={user.name} />
//             <h2>{user.nickname}</h2>
//             <p>{user.email}</p>
//           </div>
//       )
//   );
// }