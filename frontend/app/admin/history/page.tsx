'use client';

import { history } from '../../data/mockData';

export default function AdminHistory() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 overflow-x-auto">
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="pb-3 px-3 md:px-4 text-gray-700 font-bold">Date time</th>
            <th className="pb-3 px-3 md:px-4 text-gray-700 font-bold">Username</th>
            <th className="pb-3 px-3 md:px-4 text-gray-700 font-bold">Concert name</th>
            <th className="pb-3 px-3 md:px-4 text-gray-700 font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record) => (
            <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-3 md:px-4 text-gray-700">{record.dateTime}</td>
              <td className="py-3 px-3 md:px-4 text-gray-700">{record.username}</td>
              <td className="py-3 px-3 md:px-4 text-gray-700">{record.concertName}</td>
              <td className="py-3 px-3 md:px-4">
                <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                  record.action === 'Cancel'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {record.action}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
