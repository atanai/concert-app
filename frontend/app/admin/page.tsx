'use client';

import { useEffect, useState } from 'react';
import { UserIcon, BadgeIcon, XCircleIcon, Trash2Icon, SaveIcon } from 'lucide-react';

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    seats: 0,
    description: '',
    reservedSeats: 0,
    cancelledSeats: 0,
  });
  const [seatsInfo, setSeatsInfo] = useState({
    total: 0,
    reserved: 0,
    canceled: 0,
  });
  const [concerts, setConcerts] = useState([]);
  const [errors, setErrors] = useState({
    name: '',
    seats: '',
    description: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      seats: '',
      description: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Concert name is required';
    }

    if (!formData.seats || formData.seats <= 0) {
      newErrors.seats = 'Total seats must be greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);

    // true = ผ่าน
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      const res = await fetch('http://localhost:3001/concerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || res.statusText);
      }

      setFormData({ name: '', seats: 0, description: '', reservedSeats: 0, cancelledSeats: 0 });

      setActiveTab('overview');
      await fetchConcerts();
    } catch (err: Error | any) {
      console.error(err);
      alert(err.message || 'Save failed');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/concerts/${id}`, {
        method: 'DELETE',
      });

      // update UI without refetch
      setConcerts(prev => prev.filter(c => c.id !== id));

      setDeleteConfirm(null);
    } catch (err) {
      console.error('Delete failed', err);
    }
  };
  const fetchConcerts = async () => {
    try {
      const res = await fetch('http://localhost:3001/concerts');
      const data = await res.json();
      setConcerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  useEffect(() => {
    const total = concerts.reduce((sum, c) => sum + c.seats, 0);

    setSeatsInfo({
      total,
      reserved: 0,
      canceled: 0,
    });
  }, [concerts]);

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-[#0070a4] text-white rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
          <UserIcon size={28} className="mb-2" />
          <p className="text-xs md:text-sm font-medium text-center">Total of seats</p>
          <p className="text-3xl md:text-4xl font-bold">{seatsInfo.total}</p>
        </div>
        <div className="bg-[#00a58b] text-white rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
          <BadgeIcon size={28} className="mb-2" />
          <p className="text-xs md:text-sm font-medium text-center">Reserve</p>
          <p className="text-3xl md:text-4xl font-bold">{seatsInfo.reserved}</p>
        </div>
        <div className="bg-[#e84e4e] text-white rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px] sm:col-span-2 lg:col-span-1">
          <XCircleIcon size={28} className="mb-2" />
          <p className="text-xs md:text-sm font-medium text-center">Cancel</p>
          <p className="text-3xl md:text-4xl font-bold">{seatsInfo.canceled}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <div className="flex gap-4 md:gap-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-medium transition whitespace-nowrap text-sm md:text-base ${activeTab === 'overview'
              ? 'text-[#1692ec] border-b-2 font-bold'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`pb-3 font-medium transition whitespace-nowrap text-sm md:text-base ${activeTab === 'create'
              ? 'text-[#1692ec] border-b-2 font-bold'
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

      {/* Create Form */}
      {activeTab === 'create' && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#1692ec] mb-6">Create</h2>

          <form className="space-y-6">
            {/* Concert Name and Total Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Concert Name</label>
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
                <input
                  type="text"
                  placeholder="Please input concert name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-transparent placeholder:text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Total of seat</label>
                {errors.seats && (
                  <p className="text-sm text-red-500 mt-1">{errors.seats}</p>
                )}
                <div className="relative">
                  <input
                    type="number"
                    placeholder="500"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                    className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-transparent placeholder:text-gray-300"
                  />
                  <UserIcon size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
              <textarea
                placeholder="Please input description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:border-transparent placeholder:text-gray-300"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-[#1692ec] hover:bg-[#005a8b] text-white px-6 py-2 rounded-lg flex items-center gap-2 transition font-medium text-sm md:text-base"
              >
                <SaveIcon size={18} />
                Save
              </button>
            </div>
          </form>
        </div>
      )}

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
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-3 md:px-4 py-2 bg-[#e84e4e] text-white text-xs md:text-sm rounded-sm hover:bg-[#d43a3a] transition font-thin"
              >
                Yes,Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
