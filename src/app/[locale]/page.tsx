import {useTranslations} from 'next-intl';
import {Link} from '../../i18n/routing';
import Welcome from '../components/welcome/welcome'
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
      <Welcome />
    </div>
  );
}