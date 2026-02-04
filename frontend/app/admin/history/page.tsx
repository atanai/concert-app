'use client';

import { useEffect, useState } from "react";

type HistoryRecord = {
  id: number;
  dateTime: string;     // or createdAt from backend
  username: string;
  concertName: string;
  action: string;
};

export default function AdminHistory() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const res = await fetch('http://localhost:3001/histories');

        if (!res.ok) {
          throw new Error('Failed to fetch histories');
        }

        const data = await res.json();
        setHistory(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  return (
    <div>
      <table className="w-full text-sm border border-gray-300 border-collapse">
        <thead className="bg-gray-90">
          <tr className="border-b border-gray-300 text-left">
            <th className="py-3 px-3 md:px-4 text-gray-700 font-bold border">Date time</th>
            <th className="py-3 px-3 md:px-4 text-gray-700 font-bold border">Username</th>
            <th className="py-3 px-3 md:px-4 text-gray-700 font-bold border">Concert name</th>
            <th className="py-3 px-3 md:px-4 text-gray-700 font-bold border">Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record) => (
            <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-3 md:px-4 text-gray-700 border">{record.dateTime}</td>
              <td className="py-3 px-3 md:px-4 text-gray-700 border">{record.username}</td>
              <td className="py-3 px-3 md:px-4 text-gray-700 border">{record.concertName}</td>
              <td className="py-3 px-3 md:px-4 text-gray-700 border">
                <span className={`px-3 py-1 md:px-0 rounded-full text-gray-700 md:text-sm font-medium `}>
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
