'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import JobListingCard from '@/components/job/JobListingCard';

interface Job {
  id: string;
  title: string;
  location: string;
  address: string;
  reqId: string;
  jobType: string;
  workType: string;
  isNew?: boolean;
  category?: string;
}

interface JobListingsProps {
  filters?: {
    category: string;
    location: string;
    jobType: string;
  };
}

const JobListings: FC<JobListingsProps> = ({ filters }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Mock job data - replace with actual API call
  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'FIELD SERVICE PROFESSIONAL - EDMONTON',
        location: 'Edmonton, AB',
        address: '2450 Jasper Ave, Edmonton, AB T5J 3N9, Canada',
        reqId: 'Req163351',
        jobType: 'Full Time',
        workType: 'Multiple Locations',
        isNew: false,
        category: 'HD Equipment Services'
      },
      {
        id: '2',
        title: 'ECOMMERCE BRAND ADVOCATE ANALYST',
        location: 'Toronto, ON',
        address: '1 Concorde Gate, Toronto, ON M3C 4H9, Canada',
        reqId: 'Req162305',
        jobType: 'Other',
        workType: 'Hybrid',
        isNew: false,
        category: 'Merchandising'
      },
      {
        id: '3',
        title: 'BUS PRO LEAD, ENGINEERING ANALYTICS & SOLUTIONS',
        location: 'Toronto, ON',
        address: '1 Concorde Gate, Toronto, ON M3C 4H9, Canada',
        reqId: 'Req162822',
        jobType: 'Full Time',
        workType: 'Hybrid',
        isNew: false,
        category: 'Information Technology'
      },
      {
        id: '4',
        title: 'MANAGER WORKFORCE OPERATIONS CAN',
        location: 'Toronto, ON',
        address: '1 Concorde Gate, Toronto, ON M3C 4H9, Canada',
        reqId: 'Req162821',
        jobType: 'Full Time',
        workType: 'Hybrid',
        isNew: false,
        category: 'Human Resources'
      },
      {
        id: '5',
        title: 'BUS PRO LEAD, ENGINEERING ANALYTICS & SOLUTIONS',
        location: 'Toronto, ON',
        address: '1 Concorde Gate, Toronto, ON M3C 4H9, Canada',
        reqId: 'Req163332',
        jobType: 'Full Time',
        workType: 'Hybrid',
        isNew: false,
        category: 'Information Technology'
      }
    ];
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  useEffect(() => {
    if (!filters) {
      setFilteredJobs(jobs);
      return;
    }

    let filtered = [...jobs];

    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter(job => job.location.includes(filters.location));
    }

    if (filters.jobType) {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  return (
    <div className="w-full">
      <h2 className="text-[28px] font-bold text-black mb-5">Corporate Opportunities</h2>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No jobs found matching your filters.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredJobs.map((job) => (
            <JobListingCard
              key={job.id}
              id={job.id}
              title={job.title}
              address={job.address}
              reqId={job.reqId}
              jobType={job.jobType}
              workType={job.workType}
              isNew={job.isNew}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;
