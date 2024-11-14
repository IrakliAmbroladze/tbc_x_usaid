'use client';
import { Link } from '../../../i18n/routing';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'CRM', href: '/dashboard/CRM'},
  {
    name: 'Sales',
    href: '/dashboard/sales',
  },
  { name: 'Orders', href: '/dashboard/orders'},
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
