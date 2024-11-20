'use client'
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition} from 'react'
import { useTranslations } from 'next-intl';

export default function Language() {
  const t = useTranslations('Language');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const onSelectChange = (e)=>{
    const nextLocale = e.target.value;
    startTransition(()=>{
      router.replace(`/${nextLocale}`);
    });
  }
  return (
    <label className='m-2 '>
      <p className='sr-only'>change language</p>
      <select 
        defaultValue={localActive}
        className='px-2 dark:text-white dark:bg-black border border-black rounded-md' 
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='en'>{t('english')}</option>
        <option value='ka'>{t('georgian')}</option>
      </select>
    </label>
  )
}
