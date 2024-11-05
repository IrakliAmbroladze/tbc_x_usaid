"use client";
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
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
      <div className='mr-5'>
        <b>Theme color</b>
        </div>
    <div className='flex text-black'>
    <select onChange={(e) => setTheme(e.target.value)} >
      <option value="light">Light Mode</option>
      <option value="dark">Dark Mode</option>
      <option value="system">System Default</option>
    </select>
    </div>
    </div>
  );
}
