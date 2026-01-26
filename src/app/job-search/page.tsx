'use client';

import { useState } from 'react';
import JobSearchHero from '@/components/job/JobSearchHero';
import JobSearchFilters from '@/components/job/JobSearchFilters';
import JobSearchResults from '@/components/job/JobSearchResults';
import StoreLocationsSection from '@/components/job/StoreLocationsSection';

interface FilterState {
  careerArea: string[];
  jobLocation: string[];
  jobType: string[];
}

export default function JobSearchPage() {
  const [filters, setFilters] = useState<FilterState>({
    careerArea: [],
    jobLocation: [],
    jobType: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <main>
      {/* Desktop Hero - Hidden on mobile */}
      <div className="hidden lg:block">
        <JobSearchHero />
      </div>

      {/* Mobile Header - Blurred image with person in orange apron */}
      <div className="lg:hidden relative w-full h-[120px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-image.png"
            alt="Home Depot Canada"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-[1920px] mx-auto lg:px-4 md:px-6 lg:px-8 py-0 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters (Desktop only) */}
            <div className="hidden lg:block lg:col-span-3">
              <JobSearchFilters onFilterChange={setFilters} />
            </div>

            {/* Center - Job Listings */}
            <div className="lg:col-span-6">
              <JobSearchResults 
                filters={filters} 
                onFilterClick={() => setShowMobileFilters(true)}
                showMobileFilters={showMobileFilters}
                onCloseMobileFilters={() => setShowMobileFilters(false)}
              />
            </div>

            {/* Right Sidebar - Store Locations, Map, Saved Jobs, Benefits (Desktop only) */}
            <div className="hidden lg:block lg:col-span-3">
              <StoreLocationsSection />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal/Drawer */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileFilters(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-semibold text-black">Filter Jobs</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-600 hover:text-black text-2xl font-bold"
                aria-label="Close filters"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <JobSearchFilters onFilterChange={setFilters} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
