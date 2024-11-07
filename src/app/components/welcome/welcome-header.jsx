import {useTranslations} from 'next-intl';

import Image from "next/image"
import Logo from '../../assets/images/killer_logo_white-blue.png'

export default function WelcomeHeader(){
  const t = useTranslations('HomePage');

  return (
    <>
    <div className="welcomeHeader">
      <Image className="welcomeHeaderLogo" src={Logo} width={200} alt="logo"/>
       <h1 className="text-7xl">{t('pestService')}</h1>
    </div>
    </>
  )
}