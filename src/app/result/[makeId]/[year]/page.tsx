"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';

export type VehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

const fetchVehicleModels = async (makeId: string, year: string): Promise<VehicleModel[]> => {
  const url = process.env.NEXT_PUBLIC_VEHICLE_MODELS_URL.replace('{makeId}', makeId).replace('{year}', year);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle models');
  }
  const data = await response.json();
  return data.Results || [];
};

const ResultPage: React.FC = () => {
  const { makeId, year } = useParams();
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (makeId && year) {
      const fetchData = async () => {
        try {
          const vehicleModels = await fetchVehicleModels(makeId, year);
          setModels(vehicleModels);
        } catch (error) {
          console.error('Error fetching vehicle models:', error);
          setError('Error fetching vehicle models');
        }
      };

      fetchData();
    }
  }, [makeId, year]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Vehicle Models</h1>
      <Suspense fallback={<Loading />}>
        <div className="space-y-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {models.length > 0 ? (
              models.map((model) => (
                <li key={model.Model_ID} className="bg-white shadow-md rounded-md p-4 text-gray-700">
                  <h2 className="text-lg font-semibold">{model.Model_Name}</h2>
                  <p className="text-sm text-gray-500">Make: {model.Make_Name}</p>
                </li>
              ))
            ) : (
              <li className="bg-white shadow-md rounded-md p-4 text-gray-500">No vehicle models found</li>
            )}
          </ul>
        </div>
      </Suspense>
    </div>
  );
};

export default ResultPage;
