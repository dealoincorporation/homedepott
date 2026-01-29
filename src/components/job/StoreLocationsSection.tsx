'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FC } from 'react';

const StoreLocationsSection: FC = () => {
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);

  const stores = [
    { name: 'ST JOHN\'S STORE', address: '70 Kelsey Drive, St. Johns, NL A1B 5C7, Canada' },
    { name: 'ST CATHARINES STORE', address: '20 YMCA Drive, St. Catharines, ON L2N 7R6, Canada' },
    { name: 'HAMILTON STORE', address: '350 Centennial Parkway, Hamilton, ON L8E 2X4, Canada' },
    { name: 'ANCASTER STORE', address: '122 Martindale Crescent, Ancaster, ON L9K 1J9, Canada' },
    { name: 'BURLINGTON STORE', address: '3050 Davidson Court, Burlington, ON L7M 4M9, Canada' },
    { name: 'OAKVILLE BURLOAK STORE', address: '3300 South Service Road West, Oakville, ON L6L 0B1, Canada' },
    { name: 'TRAFALGAR VILLAGE STORE', address: '99 Cross Avenue, Oakville, ON L6J 2W7, Canada' },
    { name: 'OAKVILLE STORE', address: '2555 Bristol Circle, Oakville, ON L6H 5W9, Canada' }
  ];

  return (
    <div className="space-y-6">
      {/* Store Locations Section - Black Background */}
      <div className="bg-black text-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase">
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          JOIN OUR STORE TEAM IN A LOCATION NEAR YOU
        </h2>

        {/* Store Card */}
        <div className="bg-white text-black p-4 rounded mb-4 relative">
          <h3 className="font-bold text-sm mb-1">{stores[currentStoreIndex].name}</h3>
          <p className="text-xs text-gray-700">{stores[currentStoreIndex].address}</p>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2">
          {stores.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStoreIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStoreIndex ? 'bg-orange-600' : 'bg-white/30'
              }`}
              aria-label={`Go to store ${index + 1}`}
            />
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3 uppercase">VIEW OUR STORE JOBS ON A MAP</h3>
          <div className="bg-gray-800 rounded-lg overflow-hidden h-48 relative">
            {/* Placeholder for map - in production, this would be an actual map component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-xs">Map View</p>
              </div>
            </div>
            {/* Map pins would be rendered here */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-orange-600 rounded-full"></div>
            <div className="absolute top-12 left-12 w-3 h-3 bg-orange-600 rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-3 h-3 bg-orange-600 rounded-full"></div>
            <div className="absolute bottom-16 right-16 w-3 h-3 bg-orange-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Saved Jobs Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M0,10 L10,0" stroke="orange" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#diagonalHatch)" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-black mb-3 uppercase">SAVED JOBS</h3>
        <p className="text-sm text-gray-600">You haven't saved any active jobs.</p>
      </div>

      {/* Benefits Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-black mb-3 uppercase">BENEFITS</h3>
        <p className="text-sm text-gray-600">
          Explore the comprehensive benefits package available to Home Depot associates.
        </p>
      </div>
    </div>
  );
};

export default StoreLocationsSection;
