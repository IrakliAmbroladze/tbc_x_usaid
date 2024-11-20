"use client";
import { useEffect, useState } from 'react';
import {useTranslations} from 'next-intl';


export default function ThemeToggle() {
  const t = useTranslations('ThemeToggle');

  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.theme ? localStorage.theme : "system"
  );

  useEffect(() => {
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.theme = theme;
    }
    document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
  }, [theme]);

  return (

    <div className='flex'>
      <div className='mr-1'>
        <b>{t('theme')}</b>
        </div>
    <div className='flex text-black'>
    <select 
    className='dark:text-white dark:bg-black border border-black rounded-md' 
    onChange={(e) => setTheme(e.target.value)} >
      <option value="light">{t('light')}</option>
      <option value="dark">{t('dark')}</option>
      <option value="system">{t('system')}</option>
    </select>
    </div>
    </div>
  );
}
