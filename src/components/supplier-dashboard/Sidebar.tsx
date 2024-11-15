import Link from 'next/link';
import { PlusIcon, ListBulletIcon, BellIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <div className="bg-[#CFEEF9] text-black w-full md:w-20 md:h-full p-2 flex md:flex-col items-center shadow-lg border-l-4 border-[#CFEEF9] space-x-4 md:space-x-0 md:space-y-4 fixed bottom-0 md:static">
      <Link href="/supplier-dashboard" className="hover:bg-[#B9DFEC] rounded-full p-2">
        <PlusIcon className="w-6 h-6" />
      </Link>
      <Link href="/supplier-dashboard/manage-listing" className="hover:bg-[#B9DFEC] rounded-full p-2">
        <ListBulletIcon className="w-6 h-6" />
      </Link>
      <Link href="/supplier-dashboard/notifications" className="hover:bg-[#B9DFEC] rounded-full p-2">
        <BellIcon className="w-6 h-6" />
      </Link>
    </div>
  );
}
