'use client';

import { useState, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import JobListingCard from '@/components/job/JobListingCard';

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
      location: 'Virtual, AB',
      address: 'Virtual, AB',
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
      location: 'Virtual, AB',
      address: 'Virtual, AB',
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
      location: 'Virtual, AB',
      address: 'Virtual, AB',
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
      location: 'Virtual, AB',
      address: 'Virtual, AB',
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
    const jobTitles = [
      'DATA ENTRY', 'DATA ENTRY SPECIALIST', 'DATA ENTRY CLERK', 'DATA PROCESSING ASSOCIATE',
      'PAYROLL CLERK', 'PAYROLL SPECIALIST', 'PAYROLL ADMINISTRATOR', 'PAYROLL ASSISTANT',
      'CUSTOMER REPRESENTATIVE', 'CUSTOMER SERVICE REPRESENTATIVE', 'CUSTOMER SUPPORT REPRESENTATIVE', 'CUSTOMER CARE REPRESENTATIVE',
      'VIRTUAL ASSISTANT', 'REMOTE ASSISTANT', 'ADMINISTRATIVE ASSISTANT', 'EXECUTIVE ASSISTANT'
    ];
    const locations = [
      // US addresses
      { city: 'New York', state: 'NY', address: '245 Park Avenue, New York, NY 10167, USA' },
      { city: 'Los Angeles', state: 'CA', address: '2450 W Olympic Blvd, Los Angeles, CA 90064, USA' },
      { city: 'Chicago', state: 'IL', address: '245 N Michigan Ave, Chicago, IL 60601, USA' },
      { city: 'Houston', state: 'TX', address: '2450 Main St, Houston, TX 77002, USA' },
      { city: 'Phoenix', state: 'AZ', address: '2450 E Camelback Rd, Phoenix, AZ 85016, USA' },
      { city: 'Philadelphia', state: 'PA', address: '2450 Market St, Philadelphia, PA 19103, USA' },
      { city: 'San Antonio', state: 'TX', address: '2450 Broadway St, San Antonio, TX 78215, USA' },
      { city: 'San Diego', state: 'CA', address: '2450 Kettner Blvd, San Diego, CA 92101, USA' },
      { city: 'Dallas', state: 'TX', address: '2450 N Pearl St, Dallas, TX 75201, USA' },
      { city: 'San Jose', state: 'CA', address: '2450 N First St, San Jose, CA 95131, USA' },
      // Canada addresses
      { city: 'Toronto', province: 'ON', address: '2450 Victoria Park Ave, Toronto, ON M2J 4A2, Canada' },
      { city: 'Vancouver', province: 'BC', address: '2450 Marine Dr, Vancouver, BC V7V 1J2, Canada' },
      { city: 'Calgary', province: 'AB', address: '2450 32 Ave NE, Calgary, AB T2E 6T8, Canada' },
      { city: 'Montreal', province: 'QC', address: '2450 Rue Sherbrooke O, Montreal, QC H3H 1E8, Canada' },
      { city: 'Ottawa', province: 'ON', address: '2450 Riverside Dr, Ottawa, ON K1H 8K5, Canada' },
      { city: 'Edmonton', province: 'AB', address: '2450 Jasper Ave, Edmonton, AB T5J 3N9, Canada' },
      { city: 'Winnipeg', province: 'MB', address: '2450 Portage Ave, Winnipeg, MB R3J 0E4, Canada' },
      { city: 'Quebec City', province: 'QC', address: '2450 Boulevard Laurier, Quebec City, QC G1V 2L2, Canada' },
      { city: 'Hamilton', province: 'ON', address: '2450 Main St W, Hamilton, ON L8N 3Z5, Canada' },
      { city: 'Kitchener', province: 'ON', address: '2450 King St E, Kitchener, ON N2A 1A5, Canada' }
    ];
    const jobTypes = ['Full Time', 'Part Time', 'Seasonal'];
    const workTypes = ['Onsite', 'Hybrid', 'Multiple Locations', 'Virtual'];
    const careerAreas = ['Corporate', 'Field', 'Retail Management', 'Retail Store'];

    // Simple deterministic hash function for consistent results
    const hash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    // Add base jobs first
    allJobs.push(...baseJobs);

    // Generate additional jobs
    const jobImages = [
      '/images/assistant-store-manager-fj.dd1dc314.webp',
      '/images/cashier-fj.dd6cbaeb.webp',
      '/images/department-supervisor-fj.33264519.webp',
      '/images/freight-associate-fj.235589f6.webp'
    ];
    
    for (let i = 9; i <= 372; i++) {
      const jobId = i.toString();
      // Use deterministic selection based on job ID
      const titleIndex = hash(`title-${jobId}`) % jobTitles.length;
      const locationIndex = hash(`location-${jobId}`) % locations.length;
      const jobTypeIndex = hash(`jobType-${jobId}`) % jobTypes.length;
      const workTypeIndex = hash(`workType-${jobId}`) % workTypes.length;
      const careerAreaIndex = hash(`careerArea-${jobId}`) % careerAreas.length;
      const imageIndex = hash(`image-${jobId}`) % jobImages.length;
      
      // Deterministic isNew: roughly 10% of jobs (based on hash)
      const isNew = (hash(`isNew-${jobId}`) % 10) === 0;
      
      const selectedLocation = locations[locationIndex];
      const locationName = selectedLocation.city + (selectedLocation.state ? `, ${selectedLocation.state}` : `, ${selectedLocation.province}`);
      
      allJobs.push({
        id: jobId,
        title: `${jobTitles[titleIndex]}`,
        location: locationName,
        address: selectedLocation.address,
        reqId: `Req${160000 + i}`,
        jobType: jobTypes[jobTypeIndex],
        workType: workTypes[workTypeIndex],
        careerArea: careerAreas[careerAreaIndex],
        isNew,
        image: jobImages[imageIndex]
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
          // Handle "Virtual" location separately
          if (selectedLocation === 'Virtual' || selectedLocation.toUpperCase().includes('VIRTUAL')) {
            return job.location.toUpperCase().includes('VIRTUAL') || 
                   job.address.toUpperCase().includes('VIRTUAL');
          }
          
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
