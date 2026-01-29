'use client';

import { UserIcon } from 'lucide-react';
import { concerts } from '../data/mockData';

export default function UserPage() {
  return (
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
              className="w-full sm:w-auto bg-[#e84e4e] hover:bg-[#d43a3a] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition text-sm md:text-base">
              <span className="font-medium">Cancel</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
