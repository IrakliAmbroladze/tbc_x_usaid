// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
import { UserProfile } from "./user-profile";

import "./index.css"


export default function Profile (){
    return (
        <div className="page-wrapper">
            {/* <Header /> */}
            <div className="default-layout">
                <UserProfile />
                {/* <Footer /> */}
            </div>
        </div>

    )
}