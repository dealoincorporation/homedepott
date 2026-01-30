'use client';

import { useState, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import JobListingCard from '@/components/job/JobListingCard';
import {
  JOB_IMAGES,
  JOB_TITLES,
  JOB_SEARCH_LOCATIONS,
  JOB_TYPES,
  WORK_TYPES,
  CAREER_AREAS,
  hashString,
  getLocationDisplayName,
} from '@/data/jobs';

interface JobSearchResultsProps {
  filters?: {
    careerArea: string[];
    jobLocation: string[];
    jobType: string[];
  };
  onFilterClick?: () => void;
  showMobileFilters?: boolean;
  onCloseMobileFilters?: () => void;
}

const JobSearchResults: FC<JobSearchResultsProps> = ({ filters, onFilterClick }) => {
  const [sortBy, setSortBy] = useState('proximity');
  const [currentPage, setCurrentPage] = useState(1);

  // Generate mock job data - prioritize Data Entry, Payroll Clerk, Customer Representative, Virtual Assistant
  const baseJobs = [
    {
      id: '1',
      title: 'DATA ENTRY',
      location: 'Calgary, AB',
      address: '2450 32 Ave NE, Calgary, AB T2E 6T8, Canada',
      reqId: 'Req163351',
      jobType: 'Full Time',
      workType: 'Virtual',
      careerArea: 'Corporate',
      isNew: true,
      image: '/images/assistant-store-manager-fj.dd1dc314.webp'
    },
    {
      id: '2',
      title: 'PAYROLL CLERK',
      location: 'Toronto, ON',
      address: '2450 Victoria Park Ave, Toronto, ON M2J 4A2, Canada',
      reqId: 'Req164191',
      jobType: 'Full Time',
      workType: 'Virtual',
      careerArea: 'Corporate',
      isNew: true,
      image: '/images/cashier-fj.dd6cbaeb.webp'
    },
    {
      id: '3',
      title: 'CUSTOMER REPRESENTATIVE',
      location: 'Vancouver, BC',
      address: '2450 Marine Dr, Vancouver, BC V7V 1J2, Canada',
      reqId: 'Req164345',
      jobType: 'Full Time',
      workType: 'Virtual',
      careerArea: 'Corporate',
      isNew: true,
      image: '/images/department-supervisor-fj.33264519.webp'
    },
    {
      id: '4',
      title: 'VIRTUAL ASSISTANT',
      location: 'Montreal, QC',
      address: '2450 Rue Sherbrooke O, Montreal, QC H3H 1E8, Canada',
      reqId: 'Req164116',
      jobType: 'Full Time',
      workType: 'Virtual',
      careerArea: 'Corporate',
      isNew: true,
      image: '/images/freight-associate-fj.235589f6.webp'
    },
    {
      id: '5',
      title: 'DATA ENTRY SPECIALIST',
      location: 'Toronto, ON',
      address: '2450 Victoria Park Ave, Toronto, ON M2J 4A2, Canada',
      reqId: 'Req164117',
      jobType: 'Part Time',
      workType: 'Virtual',
      careerArea: 'Corporate',
      isNew: false,
      image: '/images/assistant-store-manager-fj.dd1dc314.webp'
    },
    {
      id: '6',
      title: 'PAYROLL SPECIALIST',
      location: 'Vancouver, BC',
      address: '2450 Marine Dr, Vancouver, BC V7V 1J2, Canada',
      reqId: 'Req164118',
      jobType: 'Full Time',
      workType: 'Virtual',
      careerArea: 'Corporate',
      isNew: false,
      image: '/images/cashier-fj.dd6cbaeb.webp'
    },
    {
      id: '7',
      title: 'CUSTOMER SERVICE REPRESENTATIVE',
      location: 'Calgary, AB',
      address: '2450 32 Ave NE, Calgary, AB T2E 6T8, Canada',
      reqId: 'Req164119',
      jobType: 'Full Time',
      workType: 'Virtual',
      careerArea: 'Corporate',
      isNew: false,
      image: '/images/department-supervisor-fj.33264519.webp'
    },
    {
      id: '8',
      title: 'REMOTE ASSISTANT',
      location: 'Montreal, QC',
      address: '2450 Rue Sherbrooke O, Montreal, QC H3H 1E8, Canada',
      reqId: 'Req164120',
      jobType: 'Part Time',
      workType: 'Virtual',
      careerArea: 'Corporate',
      isNew: false,
      image: '/images/freight-associate-fj.235589f6.webp'
    }
  ];

  // Generate more job variations to simulate 372 jobs
  const generateJobs = () => {
    const allJobs = [];
    const locations = JOB_SEARCH_LOCATIONS;

    // Add base jobs first
    allJobs.push(...baseJobs);

    for (let i = 9; i <= 372; i++) {
      const jobId = i.toString();
      const titleIndex = hashString(`title-${jobId}`) % JOB_TITLES.length;
      const locationIndex = hashString(`location-${jobId}`) % locations.length;
      const jobTypeIndex = hashString(`jobType-${jobId}`) % JOB_TYPES.length;
      const workTypeIndex = hashString(`workType-${jobId}`) % WORK_TYPES.length;
      const careerAreaIndex = hashString(`careerArea-${jobId}`) % CAREER_AREAS.length;
      const imageIndex = hashString(`image-${jobId}`) % JOB_IMAGES.length;

      const selectedLocation = locations[locationIndex];
      const isNew = (hashString(`isNew-${jobId}`) % 10) === 0;

      allJobs.push({
        id: jobId,
        title: JOB_TITLES[titleIndex],
        location: getLocationDisplayName(selectedLocation),
        address: selectedLocation.address,
        reqId: `Req${160000 + i}`,
        jobType: JOB_TYPES[jobTypeIndex],
        workType: WORK_TYPES[workTypeIndex],
        careerArea: CAREER_AREAS[careerAreaIndex],
        isNew,
        image: JOB_IMAGES[imageIndex],
      });
    }

    return allJobs;
  };

  // Memoize job generation to avoid regenerating on every render
  const allJobs = useMemo(() => generateJobs(), []);
  
  // Apply filters
  const filteredJobs = useMemo(() => {
    if (!filters || (!filters.careerArea?.length && !filters.jobLocation?.length && !filters.jobType?.length)) {
      return allJobs;
    }

    return allJobs.filter(job => {
      // Filter by career area
      if (filters.careerArea?.length && !filters.careerArea.includes(job.careerArea)) {
        return false;
      }

      // Filter by job location - check if location matches any selected location
      if (filters.jobLocation?.length) {
        const jobLocationMatch = filters.jobLocation.some(selectedLocation => {
          // Parse selected location (e.g., "AB - Calgary" -> province: "AB", city: "Calgary")
          const [province, city] = selectedLocation.split(' - ');
          
          // Normalize for comparison (case-insensitive)
          const normalizedProvince = province?.trim().toUpperCase();
          const normalizedCity = city?.trim().toUpperCase();
          
          // Check location field (e.g., "Calgary, AB" or "Toronto, ON")
          const locationUpper = job.location.toUpperCase();
          const locationMatch = (normalizedCity && locationUpper.includes(normalizedCity)) || 
                               (normalizedProvince && locationUpper.includes(normalizedProvince));
          
          // Check address field (e.g., "2450 32 Ave NE, Calgary, AB T2E 6T8")
          const addressUpper = job.address.toUpperCase();
          const addressMatch = (normalizedCity && addressUpper.includes(normalizedCity)) || 
                             (normalizedProvince && addressUpper.includes(normalizedProvince));
          
          return locationMatch || addressMatch;
        });
        
        if (!jobLocationMatch) {
          return false;
        }
      }

      // Filter by job type
      if (filters.jobType?.length) {
        // Handle "Other" job type - includes any job type not in standard list
        if (filters.jobType.includes('Other')) {
          const standardTypes = ['Full Time', 'Part Time', 'Seasonal'];
          // If job is a standard type, check if that type is also selected
          if (standardTypes.includes(job.jobType)) {
            return filters.jobType.some(type => type !== 'Other' && type === job.jobType);
          }
          // If job is not a standard type and "Other" is selected, include it
          return true;
        } else {
          // Standard filtering - job type must match one of the selected types
          if (!filters.jobType.includes(job.jobType)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [allJobs, filters]);

  const totalJobs = filteredJobs.length;
  const jobsPerPage = 10;
  const startIndex = (currentPage - 1) * jobsPerPage + 1;
  const endIndex = Math.min(currentPage * jobsPerPage, totalJobs);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  // Get jobs for current page
  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice(startIndex - 1, endIndex);
  }, [filteredJobs, startIndex, endIndex]);

  return (
    <div>
      {/* Mobile Header - Job Count and Filter Button */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Showing {startIndex}-{endIndex} of {totalJobs} jobs
          </span>
          <button
            onClick={onFilterClick}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>Filter</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Header with Sort and Pagination */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Showing {startIndex}-{endIndex} of {totalJobs} jobs sorted by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-600 text-sm"
          >
            <option value="proximity">Proximity to you</option>
            <option value="date">Date</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-600 text-sm"
          >
            {Array.from({ length: Math.ceil(totalJobs / jobsPerPage) }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Page {(i + 1).toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          <button
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalJobs / jobsPerPage), prev + 1))}
            disabled={currentPage >= Math.ceil(totalJobs / jobsPerPage)}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-0 lg:space-y-4">
        {paginatedJobs.map((job, index) => (
          <div key={job.id} className={index > 0 ? 'border-t border-gray-200' : ''}>
            <JobListingCard
              id={job.id}
              title={job.title}
              address={job.address}
              reqId={job.reqId}
              jobType={job.jobType}
              workType={job.workType}
              isNew={job.isNew}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearchResults;
