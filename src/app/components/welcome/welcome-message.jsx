import BtnGlobal from '../small/btn-global'
import Link from 'next/link'

export default function WelcomeMessage(){
  return (
    <div className="welcomeMessage">
      <p style={{marginBottom: '2rem'}}>
        <strong>Welcome to Killers. </strong> 
        <span>This is a pest service company to help you in making </span>
        <strong>disinfection, </strong> 
        <strong>disinsection </strong> 
        <span>and </span> 
        <strong>deratization</strong> procedures.
      </p>
      <Link href="/login">
        <BtnGlobal height='4rem' width='10rem'>Login ⭬</BtnGlobal>
      </Link>
    </div>

  )
}