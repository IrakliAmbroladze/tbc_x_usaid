import BtnGlobal from '../small/btn-global'
import Link from 'next/link'

export default function WelcomeMessage(){
  return (
    <div className="welcomeMessage bg-[#f9fafb] dark:bg-stone-700 dark:text-white">
      <p style={{marginBottom: '2rem'}}>
        <strong>Welcome to Killers. </strong> 
        <span>This is a pest service company to help you in making </span>
        <strong>disinfection, </strong> 
        <strong>disinsection </strong> 
        <span>and </span> 
        <strong>deratization</strong> procedures.
      </p>
      <Link href="/api/auth/login">
        <BtnGlobal height='4rem' width='10rem'>Login ⭬</BtnGlobal>
      </Link>
      <a href="/api/auth/logout">Logout</a>
    </div>

  )
}