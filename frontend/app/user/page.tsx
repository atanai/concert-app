'use client';

import { UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Concert = {
  id: number;
  name: string;
  description: string;
  seats: number;
  reservedSeats: number[];
  cancelledSeats: number[];
};

const currentUserId = 0;

export default function UserPage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await fetch('http://localhost:3001/concerts');

        if (!res.ok) {
          throw new Error('Failed to fetch concerts');
        }

        const data = await res.json();
        setConcerts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  const reserveSeat = async (concertId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/concerts/${concertId}/reserve`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUserId }),
        }
      );

      if (!res.ok) throw new Error('Reserve failed');

      const updatedConcert = await res.json();

      // update state
      setConcerts(prev =>
        prev.map(c =>
          c.id === concertId ? updatedConcert : c
        )
      );
    } catch (err: any) {
      alert(err.message);
    }
  };


  const cancelReservation = async (concertId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/concerts/${concertId}/cancel`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUserId }),
        }
      );

      if (!res.ok) throw new Error('Cancel failed');

      const updatedConcert = await res.json();

      // update state
      setConcerts(prev =>
        prev.map(c =>
          c.id === concertId ? updatedConcert : c
        )
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {concerts.map((concert) => {
        const isReserved = concert.reservedSeats?.includes(currentUserId);

        return (
          <div
            key={concert.id}
            className="bg-white border border-gray-200 rounded-lg p-4 md:p-6"
          >
            <h2 className="text-lg md:text-xl font-bold text-[#1692ec] mb-3">
              {concert.name}
            </h2>

            <div className="border-b border-gray-300 mb-4"></div>

            <p className="text-gray-700 text-xs md:text-sm mb-4 leading-relaxed">
              {concert.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <UserIcon size={18} />
                <span className="text-sm md:text-base font-medium pt-1">
                  {concert.seats}
                </span>
              </div>

              <button
                className={`w-full sm:w-auto text-white px-4 py-2 rounded-sm flex items-center justify-center gap-2 transition text-sm md:text-base
                ${isReserved
                    ? "bg-[#e84e4e] hover:bg-[#d43a3a]"
                    : "bg-[#1692ec] hover:bg-[#0f7acb]"
                  }
              `}
                onClick={() =>
                  isReserved
                    ? cancelReservation(concert.id)
                    : reserveSeat(concert.id)
                }
              >
                <span className="font-medium">
                  {isReserved ? "Cancel" : "Reserve"}
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
