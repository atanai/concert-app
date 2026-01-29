'use client';

import { useState } from 'react';
import { HomeIcon, UserIcon, LogOutIcon, BoxIcon, RefreshCcwIcon, MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isUserView = pathname === '/user';
  const isHome = pathname === '/admin' || pathname === '/';
  const isHistory = pathname === '/admin/history';

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-4 text-gray-700 hover:bg-gray-100 flex items-center gap-2 bg-white border-b border-gray-200"
      >
        {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        <span className="text-sm font-medium">Menu</span>
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'flex' : 'hidden'
        } md:flex flex-col w-full md:w-48 lg:w-60 xl:w-72 bg-white border-b md:border-b-0 md:border-r border-gray-200 fixed md:relative top-16 md:top-0 left-0 right-0 z-50 md:z-auto max-h-[calc(100vh-64px)] md:max-h-screen md:h-screen overflow-y-auto md:overflow-y-auto`}>
        <div className="p-6 hidden md:block">
          <h1 className="text-xl font-bold text-gray-900">{isUserView ? 'User' : 'Admin'}</h1>
        </div>

        <nav className="flex-1 px-4 md:px-0 space-y-2">
          {!isUserView && (
            <>
              <Link href="/admin" onClick={closeSidebar}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm md:text-base ${isHome ? 'bg-[#eaf5f9] text-black' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <HomeIcon size={20} />
                  <span className="font-medium">Home</span>
                </button>
              </Link>
              <Link href="/admin/history" onClick={closeSidebar}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm md:text-base ${isHistory ? 'bg-[#eaf5f9] text-black' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <BoxIcon size={20} />
                  <span className="font-medium">History</span>
                </button>
              </Link>
            </>
          )}
          {isUserView && (
            <Link href="/admin" onClick={closeSidebar}>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm md:text-base text-gray-700 hover:bg-gray-100">
                <RefreshCcwIcon size={20} className="flex-shrink-0" />
                <span className="font-medium">Switch to Admin</span>
              </button>
            </Link>
          )}
          {!isUserView && (
            <Link href="/user" onClick={closeSidebar}>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm md:text-base text-gray-700 hover:bg-gray-100">
                <RefreshCcwIcon size={20} className="flex-shrink-0" />
                <span className="font-medium">Switch to user</span>
              </button>
            </Link>
          )}
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200 px-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition text-sm md:text-base">
            <LogOutIcon size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
