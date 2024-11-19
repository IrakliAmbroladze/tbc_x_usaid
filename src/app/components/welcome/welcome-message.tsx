import BtnGlobal from '../small/btn-global'
import {useTranslations} from 'next-intl';


export default function WelcomeMessage(){
  const t = useTranslations('HomePage');

  return (
    <div className="welcomeMessage text-black bg-[#f9fafb] dark:bg-stone-700 dark:text-white">
      <p style={{marginBottom: '2rem'}}>
        <strong>Welcome to Killers. </strong> 
        <span>This is a pest service company to help you in making </span>
        <strong>disinfection, </strong> 
        <strong>disinsection </strong> 
        <span>and </span> 
        <strong>deratization</strong> procedures.
      </p>
      <BtnGlobal href='/api/auth/login' height='4rem' width='10rem'>{t('login')} ⭬</BtnGlobal>
      <a href="/api/auth/logout">{t('logout')}</a>
    </div>

  )
}