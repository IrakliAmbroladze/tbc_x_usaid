import {Link} from '../../../i18n/routing';
import Image from "next/image"
import NavLinks from '../../components/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link href="/dashboard" className="mb-2 flex h-40 justify-center rounded-md bg-[#222e46] p-4 md:h-40">
        <div className="w-32 md:w-40">
          <Image src={'/assets/images/killer_logo_white-blue.png'} height={300} width={300} alt="logo"/>
        </div>
      </Link>
      
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <a  href="/api/auth/logout" className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </a>
        </form>
      </div>
    </div>
  );
}