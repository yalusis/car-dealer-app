"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Filter = () => {
  const [makes, setMakes] = useState<{ MakeId: string; MakeName: string }[]>([]);
  const [selectedMakeId, setSelectedMakeId] = useState<string>('');
  const [modelYear, setModelYear] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_VEHICLE_MAKES_URL);
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error('Error fetching vehicle makes:', error);
      }
    };

    fetchVehicleMakes();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (v, k) => (k + 2015).toString());

  const isFilterValid = selectedMakeId && modelYear;

  const handleNextClick = () => {
    if (isFilterValid) {
      router.push(`/result/${selectedMakeId}/${modelYear}`);
    }
  };

  return (
    <form className="p-8 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold mb-4">Filter Vehicles</h1>

      <div className="mb-6">
        <label htmlFor="make" className="block text-lg font-medium text-gray-700">Vehicle Make</label>
        <select
          id="make"
          className="block w-full mt-2 p-3 bg-white border border-gray-300 rounded-md"
          value={selectedMakeId}
          onChange={(e) => setSelectedMakeId(e.target.value)}
        >
          <option value="">All Makes</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="modelYear" className="block text-lg font-medium text-gray-700">Model Year</label>
        <select
          id="modelYear"
          className="block w-full mt-2 p-3 bg-white border border-gray-300 rounded-md"
          value={modelYear}
          onChange={(e) => setModelYear(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleNextClick}
        className={`px-4 py-2 rounded text-white ${isFilterValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
        disabled={!isFilterValid}
      >
        Next
      </button>
    </form>
  );
};

export default Filter;
