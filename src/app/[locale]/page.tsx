import {useTranslations} from 'next-intl';
import {Link} from '../../i18n/routing';
import Welcome from '../components/welcome/welcome'
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <h1>{t('login')}</h1>
      <Link href="/about">{t('logout')}</Link>
      <Welcome />
    </main>
  );
}