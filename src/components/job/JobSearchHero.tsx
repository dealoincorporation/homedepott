'use client';

import { useState } from 'react';
import type { FC } from 'react';

const JobSearchHero: FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const canadaLocations = [
    'AB - Calgary',
    'AB - Edmonton',
    'BC - Vancouver',
    'ON - Toronto',
    'ON - Mississauga',
    'ON - Ottawa',
    'ON - Hamilton',
    'QC - Montreal',
    'QC - Quebec City',
    'NL - St. Johns',
    'NS - Halifax'
  ];

  const usaLocations = [
    'NY - New York',
    'CA - Los Angeles',
    'CA - San Jose',
    'TX - Houston',
    'TX - Dallas',
    'IL - Chicago',
    'AZ - Phoenix',
    'PA - Philadelphia',
    'FL - Miami'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero-image.png"
          alt="Home Depot Canada work environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Dark Gray Overlay with Search Form */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full md:w-2/3 lg:w-3/5 h-full bg-[#2d2d2d] md:rounded-r-2xl flex flex-col justify-center px-8 md:px-12 lg:px-16">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Search Open Jobs
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="flex flex-col sm:flex-row gap-0 bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Job Title Input */}
              <input
                type="text"
                placeholder="Enter a Job Title or Skill"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-800 placeholder-gray-500 focus:outline-none border-none"
              />

              {/* Location Dropdown */}
              <div className="relative flex-1 border-l border-gray-300">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-6 py-4 text-gray-800 bg-white focus:outline-none appearance-none pr-10 cursor-pointer"
                >
                  <option value="">Select A Location</option>
                  <optgroup label="Canada">
                    {canadaLocations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </optgroup>
                  <optgroup label="USA">
                    {usaLocations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </optgroup>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-300 whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </form>

          {/* Accessibility Text */}
          <p className="text-sm text-gray-400 mt-4">
            Press ENTER to start searching for jobs or TAB to skip.
          </p>
        </div>
      </div>

      {/* Orange Bottom Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600"></div>
    </section>
  );
};

export default JobSearchHero;
