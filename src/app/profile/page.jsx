'use client'
// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
import { UserProfile } from "./user-profile";
import { ThemeContext, AuthContext } from './context';

import {user} from './context'

import "./index.css"


export default function Profile (){
    return (
        <div className="page-wrapper">
            {/* <Header /> */}
            <div className="default-layout">
            <AuthContext.Provider value={user}>
                {/* <div>${user}</div> */}
                <UserProfile />
                </AuthContext.Provider>
                {/* <Footer /> */}
            </div>
        </div>

    )
}