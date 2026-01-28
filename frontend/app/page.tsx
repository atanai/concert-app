'use client';

import { useState } from 'react';
import { HomeIcon, UserIcon, LogOutIcon, TrashIcon, BoxIcon, RefreshCcwIcon, BadgeIcon, XCircleIcon, ExternalLinkIcon } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSidebarBtn, setActiveSidebarBtn] = useState('home');

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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-40 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Admin</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveSidebarBtn('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSidebarBtn === 'home' ? 'bg-[#eaf5f9] text-black' : 'text-gray-700 hover:bg-gray-100'}`}>
            <HomeIcon size={20} />
            <span className="text-sm font-medium">Home</span>
          </button>
          <button 
            onClick={() => setActiveSidebarBtn('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSidebarBtn === 'history' ? 'bg-[#eaf5f9] text-black' : 'text-gray-700 hover:bg-gray-100'}`}>
            <BoxIcon size={20} />
            <span className="text-sm font-medium">History</span>
          </button>
          <button 
            onClick={() => setActiveSidebarBtn('switch')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSidebarBtn === 'switch' ? 'bg-[#eaf5f9] text-black' : 'text-gray-700 hover:bg-gray-100'}`}>
            <RefreshCcwIcon size={20} />
            <span className="text-sm font-medium">Switch to user</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <LogOutIcon size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0070a4] text-white rounded-lg p-6 flex flex-col items-center justify-center">
              <UserIcon size={28} className="mb-2" />
              <p className="text-sm font-medium">Total of seats</p>
              <p className="text-4xl font-bold">500</p>
            </div>
            <div className="bg-[#00a58b] text-white rounded-lg p-6 flex flex-col items-center justify-center">
              <BadgeIcon size={28} className="mb-2" />
              <p className="text-sm font-medium">Reserve</p>
              <p className="text-4xl font-bold">120</p>
            </div>
            <div className="bg-[#e84e4e] text-white rounded-lg p-6 flex flex-col items-center justify-center">
              <XCircleIcon size={28} className="mb-2" />
              <p className="text-sm font-medium">Cancel</p>
              <p className="text-4xl font-bold">12</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 font-medium transition ${activeTab === 'overview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`pb-3 font-medium transition ${activeTab === 'create'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Create
              </button>
            </div>
          </div>

          {/* Concerts List */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {concerts.map((concert) => (
                <div key={concert.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-blue-600 mb-3">{concert.name}</h2>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{concert.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <UserIcon size={18} />
                      <span className="text-sm font-medium">{concert.seats}</span>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                      <TrashIcon size={16} />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-600">Create new concert form goes here</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
