import Image from "next/image"
import Logo from '../../assets/images/killer_logo_white-blue.png'

export default function WelcomeHeader(){
  return (
    <>
    <div className="welcomeHeader">
      <Image className="welcomeHeaderLogo" src={Logo} width={200} alt="logo"/>
       <h1>Pest Service</h1>
    </div>
    </>
  )
}