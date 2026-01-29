'use client';

import { useState } from 'react';
import type { FC } from 'react';

interface JobSearchFiltersProps {
  onFilterChange?: (filters: { careerArea: string[]; jobLocation: string[]; jobType: string[] }) => void;
}

const JobSearchFilters: FC<JobSearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<{
    careerArea: string[];
    jobLocation: string[];
    jobType: string[];
  }>({
    careerArea: [],
    jobLocation: [],
    jobType: []
  });

  const [expandedSections, setExpandedSections] = useState<{
    careerArea: boolean;
    jobLocation: boolean;
    jobType: boolean;
  }>({
    careerArea: true, // Expanded by default
    jobLocation: false,
    jobType: false
  });

  const careerAreas = [
    'Corporate',
    'Field',
    'Retail Management',
    'Retail Store'
  ];

  const jobLocations = [
    'AB - Airdrie', 'AB - Calgary', 'AB - Edmonton', 'BC - Vancouver', 'ON - Toronto',
    'ON - Mississauga', 'ON - Ottawa', 'ON - Hamilton', 'QC - Montreal', 'QC - Quebec City',
    'NY - New York', 'CA - Los Angeles', 'CA - San Jose', 'TX - Houston', 'IL - Chicago'
  ];

  const jobTypes = [
    'Full Time',
    'Part Time',
    'Seasonal',
    'Other'
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (key: 'careerArea' | 'jobLocation' | 'jobType', value: string) => {
    const newFilters = { ...filters };
    if (newFilters[key].includes(value)) {
      newFilters[key] = newFilters[key].filter(item => item !== value);
    } else {
      newFilters[key] = [...newFilters[key], value];
    }
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      careerArea: [],
      jobLocation: [],
      jobType: []
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const activeFilterCount = filters.careerArea.length + filters.jobLocation.length + filters.jobType.length;

  return (
    <div className="sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-black flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filter Jobs By:
        </h2>
        {activeFilterCount > 0 && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {activeFilterCount} active
          </span>
        )}
      </div>
      
      {activeFilterCount > 0 && (
        <button
          onClick={handleClearFilters}
          className="w-full mb-4 px-4 py-2 text-sm text-orange-600 hover:text-orange-700 border border-orange-600 hover:bg-orange-50 rounded transition-colors"
        >
          Clear All Filters
        </button>
      )}

      {/* Career Area */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('careerArea')}
          className="w-full flex justify-between items-center py-2 text-left"
          aria-expanded={expandedSections.careerArea}
        >
          <span className="font-medium text-black">Career Area</span>
          <span className="text-orange-600 text-xl font-bold">{expandedSections.careerArea ? '−' : '+'}</span>
        </button>
        {expandedSections.careerArea && (
          <div className="mt-2 space-y-2">
            {careerAreas.map((area) => (
              <label key={area} className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.careerArea.includes(area)}
                  onChange={() => handleCheckboxChange('careerArea', area)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-600"
                />
                <span className="text-gray-700 text-sm">{area}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Job Location */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('jobLocation')}
          className="w-full flex justify-between items-center py-2 text-left"
          aria-expanded={expandedSections.jobLocation}
        >
          <span className="font-medium text-black">Job Location</span>
          <span className="text-orange-600 text-xl font-bold">{expandedSections.jobLocation ? '−' : '+'}</span>
        </button>
        {expandedSections.jobLocation && (
          <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
            {jobLocations.map((location) => (
              <label key={location} className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.jobLocation.includes(location)}
                  onChange={() => handleCheckboxChange('jobLocation', location)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-600"
                />
                <span className="text-gray-700 text-sm">{location}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Job Type */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('jobType')}
          className="w-full flex justify-between items-center py-2 text-left"
          aria-expanded={expandedSections.jobType}
        >
          <span className="font-medium text-black">Job Type</span>
          <span className="text-orange-600 text-xl font-bold">{expandedSections.jobType ? '−' : '+'}</span>
        </button>
        {expandedSections.jobType && (
          <div className="mt-2 space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.jobType.includes(type)}
                  onChange={() => handleCheckboxChange('jobType', type)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-600"
                />
                <span className="text-gray-700 text-sm">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearchFilters;
