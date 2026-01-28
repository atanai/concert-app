'use client';

import { useState } from 'react';
import { HomeIcon, UserIcon, LogOutIcon, BoxIcon, RefreshCcwIcon, BadgeIcon, XCircleIcon, MenuIcon, XIcon, Trash2Icon } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSidebarBtn, setActiveSidebarBtn] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const concerts = [
    {
      id: 1,
      name: 'Concert Name 1',
      description: 'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
      seats: 500,
    },
    {
      id: 2,
      name: 'Concert Name 2',
      description: 'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a.',
      seats: 200,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
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
        } md:flex flex-col w-full md:w-40 bg-white border-b md:border-b-0 md:border-r border-gray-200 fixed md:relative top-16 md:top-0 left-0 right-0 z-50 md:z-auto max-h-[calc(100vh-64px)] md:max-h-screen md:h-screen overflow-y-auto md:overflow-y-auto`}>
        <div className="p-6 hidden md:block">
          <h1 className="text-xl font-bold text-gray-900">Admin</h1>
        </div>

        <nav className="flex-1 px-4 md:px-0 space-y-2">
          <button
            onClick={() => {
              setActiveSidebarBtn('home');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm md:text-base ${activeSidebarBtn === 'home' ? 'bg-[#eaf5f9] text-black' : 'text-gray-700 hover:bg-gray-100'}`}>
            <HomeIcon size={20} />
            <span className="font-medium">Home</span>
          </button>
          <button
            onClick={() => {
              setActiveSidebarBtn('history');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm md:text-base ${activeSidebarBtn === 'history' ? 'bg-[#eaf5f9] text-black' : 'text-gray-700 hover:bg-gray-100'}`}>
            <BoxIcon size={20} />
            <span className="font-medium">History</span>
          </button>
          <button
            onClick={() => {
              setActiveSidebarBtn('switch');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm md:text-base ${activeSidebarBtn === 'switch' ? 'bg-[#eaf5f9] text-black' : 'text-gray-700 hover:bg-gray-100'}`}>
            <RefreshCcwIcon size={20} className="flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">Switch to user</span>
          </button>
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200 px-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition text-sm md:text-base">
            <LogOutIcon size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        <div className="p-4 md:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-[#0070a4] text-white rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
              <UserIcon size={28} className="mb-2" />
              <p className="text-xs md:text-sm font-medium text-center">Total of seats</p>
              <p className="text-3xl md:text-4xl font-bold">500</p>
            </div>
            <div className="bg-[#00a58b] text-white rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
              <BadgeIcon size={28} className="mb-2" />
              <p className="text-xs md:text-sm font-medium text-center">Reserve</p>
              <p className="text-3xl md:text-4xl font-bold">120</p>
            </div>
            <div className="bg-[#e84e4e] text-white rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px] sm:col-span-2 lg:col-span-1">
              <XCircleIcon size={28} className="mb-2" />
              <p className="text-xs md:text-sm font-medium text-center">Cancel</p>
              <p className="text-3xl md:text-4xl font-bold">12</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6 overflow-x-auto">
            <div className="flex gap-4 md:gap-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 font-medium transition whitespace-nowrap text-sm md:text-base ${activeTab === 'overview'
                  ? 'text-[#0070a4] border-b-2 border-[#0070a4]'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`pb-3 font-medium transition whitespace-nowrap text-sm md:text-base ${activeTab === 'create'
                  ? 'text-[#0070a4] border-b-2 border-[#0070a4]'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Create
              </button>
            </div>
          </div>

          {/* Concerts List */}
          {activeTab === 'overview' && (
            <div className="space-y-3 md:space-y-4">
              {concerts.map((concert) => (
                <div key={concert.id} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-[#1692ec] mb-3">{concert.name}</h2>
                  <div className="border-b border-gray-300 mb-4"></div>
                  <p className="text-gray-700 text-xs md:text-sm mb-4 leading-relaxed">{concert.description}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <UserIcon size={18} />
                      <span className="text-sm md:text-base font-medium">{concert.seats}</span>
                    </div>
                    <button 
                      onClick={() => setDeleteConfirm(concert.id)}
                      className="w-full sm:w-auto bg-[#e84e4e] hover:bg-[#d43a3a] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition text-sm md:text-base">
                      <Trash2Icon size={16} />
                      <span className="font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
              <p className="text-gray-600 text-sm md:text-base">Create new concert form goes here</p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-none backdrop-brightness-75 px-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-lg text-center">
            <XCircleIcon size={36} className="md:size-[40px] text-red-600 mb-3 md:mb-4 mx-auto" />
            <p className="text-sm md:text-base text-gray-600 mb-2 font-bold">Are you sure to delete?</p>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-bold truncate">"{concerts.find(c => c.id === deleteConfirm)?.name}"</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-3 md:px-4 py-2 bg-gray-200 text-gray-800 text-xs md:text-sm rounded-sm hover:bg-gray-300 transition font-thin"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Deleted concert:', deleteConfirm);
                  setDeleteConfirm(null);
                }}
                className="flex-1 px-3 md:px-4 py-2 bg-[#e84e4e] text-white text-xs md:text-sm rounded-sm hover:bg-[#d43a3a] transition font-thin"
              >
                Yes,Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
